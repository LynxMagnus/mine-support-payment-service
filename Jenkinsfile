@Library('defra-library@psd-512-create-db')
import uk.gov.defra.ffc.DefraUtils
def defraUtils = new DefraUtils()

def containerSrcFolder = '\\/home\\/node'
def containerTag = ''
def lcovFile = './test-output/lcov.info'
def localSrcFolder = '.'
def mergedPrNo = ''
def pr = ''
def serviceName = 'ffc-demo-payment-service'
def sonarQubeEnv = 'SonarQube'
def sonarScanner = 'SonarScanner'
def timeoutInMinutes = 5

node {
  checkout scm
  try {
    // stage('Set GitHub status as pending'){
    //   defraUtils.setGithubStatusPending()
    // }
    stage('Set branch, PR, and containerTag variables') {
      (pr, containerTag, mergedPrNo) = defraUtils.getVariables(serviceName, defraUtils.getPackageJsonVersion())
    }
    stage('Create database role and schema') {
      def credentialsId = 'postgres_ffc_demo_jenkins'
      def host = 'postgres_ffc_demo_host'
      def prCredId = 'postgresPaymentsPR'
      def dbname = serviceName.replaceAll('-', '_')
      defraUtils.destroyPrDatabaseRoleAndSchema(host, dbname, credentialsId, pr, true)
      (prSchema, prUser) = defraUtils.provisionPrDatabaseRoleAndSchema(host, dbname, credentialsId, prCredId, pr, false)

      echo "SCHEMA = $prSchema"
      echo "USER = $prUser"
    }
    // stage('Helm lint') {
    //   defraUtils.lintHelm(serviceName)
    // }
    // stage('Build test image') {
    //   defraUtils.buildTestImage(DOCKER_REGISTRY_CREDENTIALS_ID, DOCKER_REGISTRY, serviceName, BUILD_NUMBER)
    // }
    // stage('Run tests') {
    //   defraUtils.runTests(serviceName, serviceName, BUILD_NUMBER)
    // }
    // stage('Create Test Report JUnit'){
    //   defraUtils.createTestReportJUnit()
    // }
    // stage('Fix absolute paths in lcov file') {
    //   defraUtils.replaceInFile(containerSrcFolder, localSrcFolder, lcovFile)
    // }
    // stage('SonarQube analysis') {
    //   defraUtils.analyseCode(sonarQubeEnv, sonarScanner, ['sonar.projectKey' : serviceName, 'sonar.sources' : '.'])
    // }
    // stage("Code quality gate") {
    //   defraUtils.waitForQualityGateResult(timeoutInMinutes)
    // }
    // stage('Push container image') {
    //   defraUtils.buildAndPushContainerImage(DOCKER_REGISTRY_CREDENTIALS_ID, DOCKER_REGISTRY, serviceName, containerTag)
    // }
    // if (pr == '') {
    //   stage('Publish chart') {
    //     defraUtils.publishChart(DOCKER_REGISTRY, serviceName, containerTag)
    //   }
    //   stage('Trigger GitHub release') {
    //    withCredentials([
    //     string(credentialsId: 'github-auth-token', variable: 'gitToken')
    //     ]) {
    //         defraUtils.triggerRelease(containerTag, serviceName, containerTag, gitToken)
    //     }
    //   }
    //   stage('Trigger Deployment') {
    //     withCredentials([
    //       string(credentialsId: 'payment-service-deploy-token', variable: 'jenkinsToken'),
    //       string(credentialsId: 'payment-service-job-deploy-name', variable: 'deployJobName')
    //     ]) {
    //       defraUtils.triggerDeploy(JENKINS_DEPLOY_SITE_ROOT, deployJobName, jenkinsToken, ['chartVersion': containerTag])
    //     }
    //   }
    // } else {
    //    stage('Verify version incremented') {
    //     defraUtils.verifyPackageJsonVersionIncremented()
    //   }
    //   stage('Helm install') {
    //     withCredentials([
    //       string(credentialsId: 'sqs-queue-endpoint', variable: 'sqsQueueEndpoint'),
    //       string(credentialsId: 'schedule-queue-url-pr', variable: 'scheduleQueueUrl'),
    //       string(credentialsId: 'schedule-queue-access-key-id-listen', variable: 'scheduleQueueAccessKeyId'),
    //       string(credentialsId: 'schedule-queue-secret-access-key-listen', variable: 'scheduleQueueSecretAccessKey'),
    //       string(credentialsId: 'payment-queue-url-pr', variable: 'paymentQueueUrl'),
    //       string(credentialsId: 'payment-queue-access-key-id-listen', variable: 'paymentQueueAccessKeyId'),
    //       string(credentialsId: 'payment-queue-secret-access-key-listen', variable: 'paymentQueueSecretAccessKey'),
    //       string(credentialsId: 'postgres-external-name-pr', variable: 'postgresExternalName'),
    //       usernamePassword(credentialsId: 'payment-service-postgres-user-pr', usernameVariable: 'postgresUsername', passwordVariable: 'postgresPassword'),
    //     ]) {
    //       def helmValues = [
    //         /container.scheduleQueueEndpoint="$sqsQueueEndpoint"/,
    //         /container.scheduleQueueUrl="$scheduleQueueUrl"/,
    //         /container.scheduleQueueAccessKeyId="$scheduleQueueAccessKeyId"/,
    //         /container.scheduleQueueSecretAccessKey="$scheduleQueueSecretAccessKey"/,
    //         /container.scheduleCreateQueue="false"/,
    //         /container.paymentQueueEndpoint="$sqsQueueEndPoint"/,
    //         /container.paymentQueueUrl="$paymentQueueUrl"/,
    //         /container.paymentQueueAccessKeyId="$paymentQueueAccessKeyId"/,
    //         /container.paymentQueueSecretAccessKey="$paymentQueueSecretAccessKey"/,
    //         /container.paymentCreateQueue="false"/,
    //         /postgresExternalName="$postgresExternalName"/,
    //         /postgresPassword="$postgresPassword"/,
    //         /postgresUsername="$postgresUsername"/,
    //         /container.redeployOnChange="$pr-$BUILD_NUMBER"/,
    //       ].join(',')

    //       def extraCommands = [
    //         "--values ./helm/ffc-demo-payment-service/jenkins-aws.yaml",
    //         "--set $helmValues"
    //       ].join(' ')

    //       defraUtils.deployChart(KUBE_CREDENTIALS_ID, DOCKER_REGISTRY, serviceName, containerTag, extraCommands)
    //       echo "Build available for review"
    //     }
    //   }
    // }
    // if (mergedPrNo != '') {
    //   stage('Remove merged PR') {
    //     defraUtils.undeployChart(KUBE_CREDENTIALS_ID, serviceName, mergedPrNo)
    //   }
    // }
    // stage('Set GitHub status as success'){
    //   defraUtils.setGithubStatusSuccess()
    // }
  } catch(e) {
    // defraUtils.setGithubStatusFailure(e.message)
    // defraUtils.notifySlackBuildFailure(e.message, "#generalbuildfailures")
    throw e
  // } finally {
  //   defraUtils.deleteTestOutput(serviceName, containerSrcFolder)
  }
}
