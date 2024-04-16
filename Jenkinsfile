pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS_ID = 'fa18182b-0ad0-43f7-8641-776638d92d70'
        HELM_RELEASE_NAME_FRONTEND = 'frontend-release'
        HELM_RELEASE_NAME_BACKEND = 'backend-release'
        // KUBECONFIG_CREDENTIALS_ID = '0c476e16-db87-4b18-bc6f-9266a01ff25a'
        KUBECONFIG_BASE64 = credentials('kubeconfig-base64')
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
        stage('Set Up Kubeconfig') {
            steps {
                script {
                    writeFile file: 'kubeconfig', text: "${env.KUBECONFIG_BASE64.decodeBase64()}"
                    env.KUBECONFIG = "${pwd()}/kubeconfig"
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl get nodes'  // Example command to test if kubeconfig is working
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