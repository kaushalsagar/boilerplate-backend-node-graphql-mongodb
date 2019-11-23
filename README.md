# ⚡️ Boilerplate: Backend with Node + GraphQL + MongoDB

This project is an easy and fast way to start new projects in JavaScript. 
The main goal is provide two repositories: one for the backend and one for the frontend application. 

This repository is for the backend and is made to work with another boilerplate: [the frontend](https://github.com/didaquis/boilerplate-frontend-react-graphql-apollo)

If you prefer, you can use one of these boilerplates without using the other! Feel free to explore ideas like develop your own backend in PHP or your frontend in Angular, for example.

### 🎁 What it's included on the backend boilerplate?
Technologies used are: Node.js + GraphQL + Apollo + Express + Mongoose + MongoDB.

**✨ These are some of the highlights:** 

✅ A server ready to use!  
✅ Users can login and registrate  
✅ You can add the 'administration' rol to some users  
✅ You can set a limit of users registered  
✅ Users data are stored on a database  
✅ The Auth validations are made with JWT  

### 📝 Backend Requirements
* MongoDB 4.0 or higher service running
* Node.js 10 or higher

### 📚 How to run the application?
* Use the command: `npm install`. If you are deploying the app in production, it's better to use this command: `npm install --production`
* Configure the application:
  * Duplicate the configuration file `_env` and rename as `.env`
  * Edit the file `.env`
* Then use: `npm run start`. 
* That's it! That was fast enough, right? 🚀

**❗️You need help with `.env` file?** 

Do not worry, I have written some information for you. Meanwhile here you have a guide:

| Key | Description |
|-----|-------------|
| PORT | The port for running the backend |
| ENVIROMENT | The mode of execution of Node.js. Choose between: production or development |
| LIMIT_USERS_REGISTERED | Maximum number of users allowed to register. Set the value to 0 to not use the limit |
| MONGO_FORMAT_CONNECTION | The format of connection with MongoDB service. Choose between: standard or DNSseedlist |
| MONGO_HOST | Set this value only if you are using the standard connection format. Host of MongoDB service |
| MONGO_PORT | Set this value only if you are using the standard connection format. Port of MongoDB service |
| MONGO_DB | Set this value only if you are using the standard connection format. The name of database |
| MONGO_USER | Set this value only if you are using the standard connection format. User name |
| MONGO_PASS | Set this value only if you are using the standard connection format. User password |
| MONGO_DNS_SEEDLIST_CONNECTION | Set this value only if you are using the DNSseedlist connection format. Will be something like this: mongodb+srv://user:password@uri-and-options |
| SECRET | JWT secret key. Remember not to share this key for security reasons |
| DURATION | JWT duration of auth token |

**❗️How can I configure a user to be an administrator?** 

To make a user an administrator you must access to the database and search its registry. You will see a Boolean who allows that user to have rol of administrator. Set it to 'true' and in his next authentication that user will have administrator permissions.

### 💻 Tricks for development
* Run app in dev mode: `npm run dev`
* Run the linter: `npm run lint`
* Delete all log files: `npm run purge`

### Would you like to contribute to this project?
It would be great to receive your help. ♥️ 

You can collaborate in multiple ways, of course. I recommend you check the **Roadmap** section of this documentation, but let me give you some ideas:
* Help me with this documentation. If you think something it's not clear, open an issue and talk to me!
* Share this project, mark it as a favorite (⭐️) or make some suggestions
* Develop other frontends that can connect to this backend

### Roadmap
Some ideas that I would like to implement:
* Add test!

