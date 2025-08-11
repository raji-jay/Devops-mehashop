pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds') // configure in Jenkins
    DOCKER_REGISTRY = 'rajijay'
    IMAGE_BACKEND = "${DOCKER_REGISTRY}/megashop-backend:latest"
    IMAGE_FRONTEND = "${DOCKER_REGISTRY}/megashop-frontend:latest"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Images') {
      steps {
        bat "docker build -t %IMAGE_BACKEND% ./backend"
        bat "docker build -t %IMAGE_FRONTEND% ./frontend"
      }
    }

    stage('Push Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          bat '''
            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
            docker push %IMAGE_BACKEND%
            docker push %IMAGE_FRONTEND%
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        bat "kubectl apply -f k8s/"
      }
    }
  }
}
