pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        FRONTEND_IMAGE      = 'bhavyatank13/frontend-app'
        BACKEND_IMAGE       = 'bhavyatank13/backend-app'
        APP_SERVER          = 'ubuntu@13.126.194.216'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/bhavya-zignuts/sample-app-20May.git'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE:latest ./frontend'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE:latest ./backend'
            }
        }

        stage('Docker Login') {
            steps {
                sh '''
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login \
                    -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                '''
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh 'docker push $FRONTEND_IMAGE:latest'
            }
        }

        stage('Push Backend Image') {
            steps {
                sh 'docker push $BACKEND_IMAGE:latest'
            }
        }

        stage('Deploy to App Server') {
            steps {
                sshagent(['app-server-ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $APP_SERVER << EOF
                        cd app

                        docker compose pull

                        docker compose down

                        docker compose up -d

                        docker image prune -f
EOF
                    '''
                }
            }
        }
    }
}