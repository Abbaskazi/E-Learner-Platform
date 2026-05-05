pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'abbaskazi0612'
        BACKEND_IMAGE   = "${DOCKER_HUB_USER}/elearning-backend"
        FRONTEND_IMAGE  = "${DOCKER_HUB_USER}/elearning-frontend"
        IMAGE_TAG       = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker build -t $BACKEND_IMAGE:$IMAGE_TAG ./backend
                        docker build -t $FRONTEND_IMAGE:$IMAGE_TAG ./frontend
                        docker tag $BACKEND_IMAGE:$IMAGE_TAG $BACKEND_IMAGE:latest
                        docker tag $FRONTEND_IMAGE:$IMAGE_TAG $FRONTEND_IMAGE:latest
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        docker push $BACKEND_IMAGE:$IMAGE_TAG
                        docker push $BACKEND_IMAGE:latest
                        docker push $FRONTEND_IMAGE:$IMAGE_TAG
                        docker push $FRONTEND_IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
             steps {
                 sh '''
                 kubectl apply -f k8s/
                 kubectl rollout restart deployment/backend
                 kubectl rollout restart deployment/frontend
                '''
             }
    }
 

    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
