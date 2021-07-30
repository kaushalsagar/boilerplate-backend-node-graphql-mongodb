'use strict';

import mongoose from 'mongoose';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { ENVIRONMENT } from './config/environment.js';
import { environmentVariablesConfig } from './config/appConfig.js';
import { logger, endLogger } from './helpers/logger.js';
import { requestDevLogger } from './helpers/requestDevLogger.js';
import { setContext } from './gql/auth/setContext.js';
import { typeDefs } from './gql/schemas/index.js';
import { resolvers } from './gql/resolvers/index.js';
import { getListOfIPV4Address } from './helpers/getListOfIPV4Address.js';
import routesManager from './routes/routesManager.js';


const mongooseConnectOptions = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false };
if (environmentVariablesConfig.formatConnection === 'DNSseedlist' && environmentVariablesConfig.mongoDNSseedlist !== '') {
	mongoose.connect(environmentVariablesConfig.mongoDNSseedlist, mongooseConnectOptions);
} else {
	if (environmentVariablesConfig.mongoUser !== '' && environmentVariablesConfig.mongoPass !== '') {
		mongoose.connect(`mongodb://${environmentVariablesConfig.mongoUser}:${environmentVariablesConfig.mongoPass}@${environmentVariablesConfig.dbHost}:${environmentVariablesConfig.dbPort}/${environmentVariablesConfig.database}`, mongooseConnectOptions);
	} else {
		mongoose.connect(`mongodb://${environmentVariablesConfig.dbHost}:${environmentVariablesConfig.dbPort}/${environmentVariablesConfig.database}`, mongooseConnectOptions);
	}
}

const db = mongoose.connection;
db.on('error', (err) => {
	logger.error(`Connection error with database. ${err}`);
});

db.once('open', () => {
	if (environmentVariablesConfig.enviroment !== ENVIRONMENT.DEVELOPMENT) {
		logger.info(`Connected with MongoDB service (${ENVIRONMENT.PRODUCTION} mode)`);
	} else {
		if (environmentVariablesConfig.formatConnection === 'DNSseedlist' && environmentVariablesConfig.mongoDNSseedlist !== '') {
			logger.info(`Connected with MongoDB service at "${environmentVariablesConfig.mongoDNSseedlist}" using database "${environmentVariablesConfig.database}" (${ENVIRONMENT.DEVELOPMENT} mode)`);
		} else {
			logger.info(`Connected with MongoDB service at "${environmentVariablesConfig.dbHost}" in port "${environmentVariablesConfig.dbPort}" using database "${environmentVariablesConfig.database}" (${ENVIRONMENT.DEVELOPMENT} mode)`);
		}
	}

	initApplication();
});

const initApplication = () => {
	const app = express();
	app.use(cors({ credentials: true }));
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use('', routesManager);

	const server = new ApolloServer({ 
		typeDefs,
		resolvers,
		context: setContext,
		introspection: (environmentVariablesConfig.enviroment === ENVIRONMENT.PRODUCTION) ? false : true, // Set to "true" only in development mode
		playground: (environmentVariablesConfig.enviroment === ENVIRONMENT.PRODUCTION) ? false : true, // Set to "true" only in development mode
		plugins: (environmentVariablesConfig.enviroment === ENVIRONMENT.PRODUCTION) ? [] : [requestDevLogger], // Log all querys and their responses (do not use in production)
	});

	server.applyMiddleware({app});

	app.use((req, res) => {
		res.status(404).send('404'); // eslint-disable-line no-magic-numbers
	});

	app.listen(environmentVariablesConfig.port, () => {
		getListOfIPV4Address().forEach(ip => {
			logger.info(`Application running on: http://${ip}:${environmentVariablesConfig.port}`);
			if (environmentVariablesConfig.enviroment !== ENVIRONMENT.PRODUCTION) {
				logger.info(`GraphQL Playground running on: http://${ip}:${environmentVariablesConfig.port}${server.graphqlPath}`);
			}
		});
	});

	// Managing application shutdown
	process.on('SIGINT', () => {
		logger.info('Stopping application...');
		endLogger();
		process.exit();
	});
};
