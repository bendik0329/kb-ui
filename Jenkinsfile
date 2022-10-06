pipeline {
    agent { label JOB_NAME }
    tools {nodejs "nodejs-jenkins"}

    environment {
        releases_path_front = "/var/www/${base_url}/releases-front"
        root_path_front = "/var/www/${base_url}/html"
    }
    
    stages {
        stage('build Vue project') {
            steps {
                sh '''
                #!/bin/bash
                cd ui
                npm i
                npm run build
                cp -r dist/ $releases_path_front
                ln -sfn $releases_path_front $root_path_front
                '''
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
} 
