pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS_ID = 'fa18182b-0ad0-43f7-8641-776638d92d70'
        DOCKER_REGISTRY = 'docker.io'
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Build and Push Backend Image') {
            steps {
                script {
                    docker.build("backend:${env.BUILD_ID}", "./backend").push()
                }
            }
        }
        stage('Build and Push Frontend Image') {
            steps {
                script {
                    docker.build("frontend:${env.BUILD_ID}", "./frontend").push()
                }
            }
        }
        stage('Build and Push PostgreSQL Image') {
            steps {
                script {
                    docker.build("postgres:${env.BUILD_ID}", "./postgres").push()
                }
            }
        }
        stage('Deploy') {
            steps {
                // Add deployment scripts here
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}