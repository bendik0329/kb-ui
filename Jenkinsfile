pipeline {
    agent any
    tools {nodejs "nodejs-jenkins"}

    environment {
        releases_path_front = '/var/www/uat.kloudrealty.com/releases-front'
        root_path_front = '/var/www/uat.kloudrealty.com/html'
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
} 
