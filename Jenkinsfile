pipeline {
    agent any
    
    environment {
        REGISTRY_URL = "192.168.81.131:30010"
        IMAGE_NAME = "alumni-app/frontend"
        IMAGE_TAG = "v${BUILD_NUMBER}"
        NEXUS_CREDS = credentials('nexus-creds')
    }

    stages {
        stage('Checkout') {
            steps {
                // Replace with your actual Frontend Git URL
                git branch: 'main', url: 'https://github.com/Avi-Maheshwari121/College-Alumni-Frontend.git'
            }
        }

        stage('Build Image') {
            steps {
                sh "docker build -t ${REGISTRY_URL}/${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Push to Nexus') {
            steps {
                script {
                    sh "echo ${NEXUS_CREDS_PSW} | docker login ${REGISTRY_URL} -u ${NEXUS_CREDS_USR} --password-stdin"
                    sh "docker push ${REGISTRY_URL}/${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }
    
    post {
        success {
            echo "Successfully deployed version ${IMAGE_TAG} to Nexus"
        }
        always {
            cleanWs()
        }
    }
}