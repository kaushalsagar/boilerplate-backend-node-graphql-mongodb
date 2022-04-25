pipeline {
  agent any
  environment {
		DOCKERHUB_CREDENTIALS=credentials('sagarkaushaldockerhub')
	}
  stages {
  stage('checking github')
  {

      steps
	{
		
         echo 'checking github'
         sh 'pwd'
	}
  }
  stage('checking Docker is running or not')
  {

      steps
	{
		
         echo 'checking github'
         sh 'docker ps -a'
	}
  }
  
  
     stage('login into Docker Registry')
  {

      steps
	{
		
         echo 'Login into Docker registry'
         sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
	}
  }

   stage('Building Docker Image')
  {

      steps
	{
		
         echo 'Building Docker Image'
         sh "docker build -t sagarkaushal1/nodeapp-sagar:${env.BUILD_NUMBER} ."
	}
  }

  stage('Pushing Docker Imgge')
  {

      steps
	{
		
         echo 'Building Docker Image'
         sh "docker push sagarkaushal1/nodeapp-sagar:${env.BUILD_NUMBER}"
	}
  }
  stage('Remove unused Images and containers')
  {
      steps
	{
		 echo "---------------------"
		 echo "---Dangling Images---"
		 sh 'docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi'
	}
  }
  stage('Deployment To Kubernetes Cluster - Mongo-db - Minikube')
  {
      steps
	{
         echo 'Mongodb Deployment'
         sh 'kubectl apply -f mongodb-deployment.yaml'
         echo 'Mongodb Service'
	 sh 'kubectl apply -f mongodb-deployment.yaml'
	}
  }
  stage('Deployment To Kubernetes Cluster - NodeJs - Minikube')
  {
      steps
	{
         echo 'NodeJs Deployment'
         sh 'cat nodejs-deployment.yaml  | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER-new/g" | kubectl apply -f -'
	 echo 'NodeJS Service'
         sh 'kubectl apply -f nodejs-service.yaml'
	}
  } 
  stage('Deployment To Kubernetes Cluster - Ingress - Minikube')
  {

      steps
	{
		
         echo 'Ingress Creationg'
         sh 'kubectl apply -f ingress.yaml'	 
	}
  }
 }
post {
    success {
      echo "Pipeline is successfully completed."
    }
    failure {
      echo "Pipeline failed. Please check the logs."
    }
}
}
