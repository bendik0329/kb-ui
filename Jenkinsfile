pipeline {
    agent { label JOB_NAME }
    tools {nodejs "nodejs-jenkins"}

    environment {
        releases_path_front = "/var/www/${base_url}/ui"
        root_path_front = "/var/www/${base_url}/html"
    }
    
    stages {
        stage('build Vue project') {
            steps {
                sh '''
                #!/bin/bash
                cp -r dist/ $releases_path_front
                cd $releases_path_front
                npm i
                npm run build
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
