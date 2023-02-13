pipeline {
    agent any
    
    stages {
        
        stage('Despliegue Grupo') {
            when {
				anyOf{
					branch 'G1';
					branch 'G2';
					branch 'G3';
					branch 'main';
				}
            }
            steps {
                 echo "Generando proyecto ...";
                 sh 'docker-compose build --force-rm';
                 sh 'docker-compose up -d';
                 script{
                    if(env.BRANCH_NAME=='G2'){
                        echo 'http://appstic.eu:20082';
                    }
                 }

            }
        }
    }
}
