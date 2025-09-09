pipeline {
 agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', poll: false, url: 'https://github.com/ayushmansingh2711/schhool--docker-k8s'
            }
        }

        stage('Build and Push Images') {
            steps {
                script {
                    sh 'docker build -t ayushman2711/jekins-project  .'
                    withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'ay_pass', usernameVariable: 'ay_user')]) {
                        sh 'docker login -u $ay_user -p $ay_pass'
                        sh 'docker push ayushman2711/jekins-project '
                    }
                }
            }
        }

        stage('Deploy Services') {
            steps {
                script {
                    sh 'docker rm -f  myjenkinscon'
                    sh 'docker run -d --name myjenkinscon -p 4422:80 ayushman2711/jekins-project'
                }
            }
        }
        
        stage('Post Deployment Testing') {
            steps {
                script {
                    sh 'curl -I http://localhost:4422'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
