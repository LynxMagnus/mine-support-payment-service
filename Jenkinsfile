@Library('defra-library@v-8') _

// buildNodeJs environment: 'dev'

  node {
    checkout scm
    sh "git remote set-branches --add origin master"
    sh "git fetch"
    sh "git remote show origin"
    sh "git show origin/master:package.json"
  }
