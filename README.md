[![Build Status](https://defradev.visualstudio.com/DEFRA_FutureFarming/_apis/build/status/defra-ffc-demo-payment-service?branchName=master)](https://defradev.visualstudio.com/DEFRA_FutureFarming/_build/latest?definitionId=611&branchName=master)

# FFC Demo Payment Service

Digital service mock to claim public money in the event property subsides into mine shaft.  The payment service subscribes to a message queue for new claims and saves a monthly payment schedule in a Postgresql database.  It also subscribes to the queue for new calculations and updates the value to pay in the database.

# Prerequisites

Either:
- Docker
- Docker Compose

Or:
- Kubernetes
- Helm

Or:
- Node 10
- PostgreSQL database
- AMQP 1.0 message queue

# Environment variables

The following environment variables are required by the application container. Values for development are set in the Docker Compose configuration. Default values for production-like deployments are set in the Helm chart and may be overridden by build and release pipelines.

| Name                          | Description                       | Required | Default     | Valid                       | Notes |
|-------------------------------|-----------------------------------|:--------:|-------------|-----------------------------|-------|
| NODE_ENV                      | Node environment                  | no       | development | development,test,production |       |
| PORT                          | Port number                       | no       | 3004        |                             |       |
| POSTGRES_HOST                 | Postgres host name                | yes      |             |                             |       |
| POSTGRES_PORT                 | Postgres port                     | yes      |             |                             |       |
| POSTGRES_DB                   | Postgres database name            | yes      |             |                             |       |
| POSTGRES_USERNAME             | Postgres username                 | yes      |             |                             |       |
| POSTGRES_PASSWORD             | Postgres password                 | yes      |             |                             |       |
| MESSAGE_QUEUE_HOST            | Host address of message queue     | no       | localhost   |                             |       |
| MESSAGE_QUEUE_PORT            | Message queue port                | no       | 5672        |                             |       |
| MESSAGE_QUEUE_RECONNECT_LIMIT | Reconnection limit for message queues | no   | 10          |                             |       |
| MESSAGE_QUEUE_TRANSPORT       | Message queue transport           | no       | tcp         |                             |       |
| SCHEDULE_QUEUE_ADDRESS        | 'Schedule' message queue name     | no       | schedule    |                             |       |
| SCHEDULE_QUEUE_USER           | 'Schedule' message queue username | yes      |             |                             |       |
| SCHEDULE_QUEUE_PASSWORD       | 'Schedule' message queue password | yes      |             |                             |       |
| PAYMENT_QUEUE_ADDRESS         | 'Payment' message queue name      | no       | payment     |                             |       |
| PAYMENT_QUEUE_USER            | 'Payment' message queue username  | yes      |             |                             |       |
| PAYMENT_QUEUE_PASSWORD        | 'Payment' message queue password  | yes      |             |                             |       |

# How to run tests

A convenience script is provided to run automated tests in a containerised environment:

```
scripts/test
```

This runs tests via a `docker-compose run` command. If tests complete successfully, all containers, networks and volumes are cleaned up before the script exits. If there is an error or any tests fail, the associated Docker resources will be left available for inspection.

Alternatively, the same tests may be run locally via npm:

```
npm run test
```

# Running the application

The application is designed to run in containerised environments: Docker Compose for development; Kubernetes for production.

A Helm chart is provided for deployment to Kubernetes and scripts are provided for local development and testing.

## Build container image

Container images are built using Docker Compose and the same image may be run in either Docker Compose or Kubernetes.

The [`build`](./scripts/build) script is essentially a shortcut and will pass any arguments through to the `docker-compose build` command.

```
# Build images using default Docker behaviour
scripts/build

# Build images without using the Docker cache
scripts/build --no-cache
```

## Run as an isolated service

To test this service in isolation, use the provided scripts to start and stop a local instance. This relies on Docker Compose and will run direct dependencies, such as message queues and databases, as additional containers. Arguments given to the [`start`](./scripts/start) script will be passed through to the `docker-compose up` command.

```
# Start the service and attach to running containers (press `ctrl + c` to quit)
scripts/start

# Start the service without attaching to containers
scripts/start --detach

# Stop the service and remove Docker volumes and networks created by the start script
scripts/stop
```

## Connect to sibling services

To test this service in combination with other parts of the FFC demo application, it is necessary to connect each service to an external Docker network and shared dependencies, such as message queues. Start the shared dependencies from the [`ffc-demo-development`](https://github.com/DEFRA/ffc-demo-development) repository and then use the `connected-` [`scripts`](./scripts/) to start this service. Follow instructions in other repositories to connect each service to the shared dependencies and network.

```
# Start the service
script/connected-start

# Stop the service
script/connected-stop
```

## Deploy to Kubernetes

For production deployments, a helm chart is included in the `.\helm` folder. This service connects to an AMQP 1.0 message broker, using credentials defined in [values.yaml](./helm/values.yaml), which must be made available prior to deployment.

Scripts are provided to test the Helm chart by deploying the service, along with an appropriate message broker, into the current Helm/Kubernetes context.

```
# Deploy to current Kubernetes context
scripts/helm/install

# Remove from current Kubernetes context
scripts/helm/delete
```

### Probes

The service has both an Http readiness probe and an Http liveness probe configured to receive at the below end points.

Readiness: `/healthy`
Liveness: `/healthz`

The readiness probe will test for both the availability of a PostgreSQL database and the two active message queue connections.

Sequelize's `authenticate` function is used to test database connectivity.  This function tries to run a basic query within the database.

# Manual testing

This service reacts to messages retrieved from an AMQP 1.0 message broker.

The [start](./scripts/start) script runs [ActiveMQ Artemis](https://activemq.apache.org/components/artemis) alongside the application to provide the required message bus and broker.

Test messages can be sent via the Artemis console UI hosted at http://localhost:8161/console/login (username: artemis, password: artemis). Messages should match the format of the sample JSON below.

__Sample payment queue message__

```
{
  "claimId": "MINE123",
  "value": 190.96
}
```

__Sample schedule queue message__

```
{
  "claimId": "MINE123"
}
```

# Build pipeline

The [azure-pipelines.yaml](azure-pipelines.yaml) performs the following tasks:
- Runs unit tests
- Publishes test result
- Pushes containers to the registry tagged with the PR number or release version
- Deletes PR deployments, containers, and namepace upon merge

Builds will be deployed into a namespace with the format `mine-support-payment-service-{identifier}` where `{identifier}` is either the release version, the PR number, or the branch name.

A detailed description on the build pipeline and PR work flow is available in the [Defra Confluence page](https://eaflood.atlassian.net/wiki/spaces/FFCPD/pages/1281359920/Build+Pipeline+and+PR+Workflow)
