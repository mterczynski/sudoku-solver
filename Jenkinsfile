pipeline {
	agent any

	environment {
    DESTINATION = "root@mterczynski.pl:/var/www/html/sudoku-solver"
  }

	stages {
		stage('Install') {
			steps{
				sh '''
					npm install
				'''
			}
		}

		stage('Test') {
			steps {
				sh '''
					npm run test
				'''
			}
		}

		stage('Build') {
			steps {
				sh '''
					npm run build
				'''
			}
		}

		stage('Deploy') {
			steps {
				sh '''
					scp -r build ${DESTINATION}
				'''
			}
		}
	}
}
