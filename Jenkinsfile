pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS_ID = 'fa18182b-0ad0-43f7-8641-776638d92d70'
        HELM_RELEASE_NAME_FRONTEND = 'frontend-release'
        HELM_RELEASE_NAME_BACKEND = 'backend-release'
        KUBECONFIG_CREDENTIALS_ID = '08b0450c-f95f-4689-8f26-bc56993b3e4e'
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Build and Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {  // Assuming Docker Hub as the registry
                        // Building and pushing the backend image
                        def backendApp = docker.build("spickman/backend-app:${env.BUILD_ID}", './backend')
                        backendApp.push()
                        
                        // Building and pushing the frontend image
                        def frontendApp = docker.build("spickman/frontend-app:${env.BUILD_ID}", './frontend')
                        frontendApp.push()
                    }
                }
            }
        }
        stage('TEST') {
            steps {
                script {
                    withCredentials([file(credentialsId: KUBECONFIG_CREDENTIALS_ID, variable: 'KUBECONFIG')]) {
                        sh 'kubectl get pods'
                    }
                }
            }
        }
        // stage('Deploy Backend to Kubernetes') {
        //     steps {
        //         script {
        //             withCredentials([file(credentialsId: KUBECONFIG_CREDENTIALS_ID, variable: 'KUBECONFIG')]) {
        //                 sh "helm upgrade --install ${HELM_RELEASE_NAME_BACKEND} ./backend/backend-chart --set image.tag=${env.BUILD_ID}"
        //             }
        //         }
        //     }
        // }
        // stage('Deploy Frontend to Kubernetes') {
        //     steps {
        //         script {
        //             withCredentials([file(credentialsId: KUBECONFIG_CREDENTIALS_ID, variable: 'KUBECONFIG')]) {
        //                 sh "helm upgrade --install ${HELM_RELEASE_NAME_FRONTEND} ./frontend/frontend-chart --set image.tag=${env.BUILD_ID}"
        //             }
        //         }
        //     }
        // }
    }
    post {
        always {
            cleanWs()
        }
    }
}