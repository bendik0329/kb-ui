pipeline {
    agent any
    tools {nodejs "nodejs-jenkins"}

    environment {
        releases_path_front = '/var/www/uat.kloudrealty.com/releases-front'
        root_path_front = '/var/www/uat.kloudrealty.com/html'
        releases_path_api = '/var/www/uat.kloudrealty.com/releases-api'
        root_path_api = '/var/www/uat.kloudrealty.com/api'
    }

    stages {
        stage('build Vue project') {
            steps {
                sh '''
                #!/bin/bash
                cd ui
                npm i
                npm run build
                dateRelease=$(date +%Y%m%d%H%M)
                cp -r dist/ $releases_path_front/$dateRelease
                ln -sfn $releases_path_front/$dateRelease $root_path_front
                '''
            }
       }
        stage('build Express project') {
            steps {
               sh '''
               #!/bin/bash
               cd api
               npm install
               dateRelease=$(date +%Y%m%d%H%M)
               cp -r ../api $releases_path_api/$dateRelease
               ln -sfn $releases_path_api/$dateRelease $root_path_api
               cd $root_path_api
               pm2 reload ecosystem.config.js --update-env
               '''
            }
       }
    }
} 
