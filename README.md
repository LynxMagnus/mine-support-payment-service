[![Known Vulnerabilities](https://snyk.io//test/github/DEFRA/ffc-demo-payment-service/badge.svg?targetFile=package.json)](https://snyk.io//test/github/DEFRA/ffc-demo-payment-service?targetFile=package.json)

# FFC Demo Payment Service

Digital service mock to claim public money in the event property subsides into mine shaft.  The payment service subscribes to a message queue for new claims and saves a monthly payment schedule in a Postgresql database.  It also subscribes to the queue for new calculations and updates the value to pay in the database.

## Prerequisites

Either:
- Docker
- Docker Compose

Or:
- Kubernetes
- Helm

Or:
- Node 10
- PostgreSQL database
- SQS compatible message queue

## Environment variables

The following environment variables are required by the application container. Values for development are set in the Docker Compose configuration. Default values for production-like deployments are set in the Helm chart and may be overridden by build and release pipelines.

| Name                          | Description                       | Required | Default     | Valid                       | Notes |
|-------------------------------|-----------------------------------|:--------:|-------------|-----------------------------|-------|
| NODE_ENV                      | Node environment                  | no       | development | development,test,production |       |
| PORT                          | Port number                       | no       | 3004        |                             |       |
| SCHEDULE_QUEUE_NAME     | Message queue name          | no       | schedule |                                     |       |
| SCHEDULE_ENDPOINT       | Message base url            | no       | http://localhost:9324 |                           |       |
| SCHEDULE_QUEUE_URL      | Message queue url           | no       | http://localhost:9324/queue/schedule |         |or tcp |
| SCHEDULE_QUEUE_REGION   | AWS region                  | no       | eu-west-2   |                                     |Ignored in local dev |
| SCHEDULE_QUEUE_ACCESS_KEY_ID | Message access key Id  | no       |             |                                     |       |
| SCHEDULE_QUEUE_ACCESS_KEY | Message access key        | no       |             |                                     |       |
| CREATE_SCHEDULE_QUEUE   | Create queue before connection | no    | true        | For AWS deployments must be set to false|   |
| PAYMENT_QUEUE_NAME         | Message queue name          | no       | payment     |                                     |       |
| PAYMENT_ENDPOINT           | Message base url            | no       | http://localhost:9324 |                           |       |
| PAYMENT_QUEUE_URL          | Message queue url           | no       | http://localhost:9324/queue/payment |         |or tcp |
| PAYMENT_QUEUE_REGION       | AWS region                  | no       | eu-west-2   |                                     |Ignored in local dev |
| PAYMENT_QUEUE_ACCESS_KEY_ID | Message access key Id      | no       |             |                                     |       |
| PAYMENT_QUEUE_ACCESS_KEY   | Message access key          | no       |             |                                     |       |
| CREATE_PAYMENT_QUEUE       | Create queue before connection | no    | true        | For AWS deployments must be set to false|   |

## How to run tests

A convenience script is provided to run automated tests in a containerised environment. The first time this is run, container images required for testing will be automatically built. An optional `--build` (or `-b`) flag may be used to rebuild these images in future (for example, to apply dependency updates).

```
# Run tests
scripts/test

# Rebuild images and run tests
scripts/test --build
```

This runs tests via a `docker-compose run` command. If tests complete successfully, all containers, networks and volumes are cleaned up before the script exits. If there is an error or any tests fail, the associated Docker resources will be left available for inspection.

Alternatively, the same tests may be run locally via npm:

```
# Run tests without Docker
npm run test
```

## Running the application

The application is designed to run in containerised environments, using Docker Compose in development and Kubernetes in production.

- A Helm chart is provided for production deployments to Kubernetes.

### Build container image

Container images are built using Docker Compose, with the same images used to run the service with either Docker Compose or Kubernetes.

By default, the start script will build (or rebuild) images so there will rarely be a need to build images manually. However, this can be achieved through the Docker Compose [build](https://docs.docker.com/compose/reference/build/) command:

```
# Build container images
docker-compose build
```

### Start and stop the service

Use Docker Compose to run service locally. 

`docker-compose up`

Additional Docker Compose files are provided for scenarios such as linking to other running services.

Link to other services:
```
docker-compose -f docker-compose.yaml -f docker-compose.link.yaml up
```

### Test the service

This service reacts to messages retrieved from an AMQP 1.0 message broker.

The [start](./scripts/start) script runs [ActiveMQ Artemis](https://activemq.apache.org/components/artemis) alongside the application to provide the required message bus and broker.

Test messages can be sent via the Artemis console UI hosted at http://localhost:8161/console/login (username: artemis, password: artemis). Messages should match the format of the sample JSON below.

Sample valid JSON for each message queue is:

```
# Sample payment queue message
{
  "claimId": "MINE123",
  "value": 190.96
}

# Sample schedule queue message
{
  "claimId": "MINE123"
}
```

### Link to sibling services

To test interactions with sibling services in the FFC demo application, it is necessary to connect each service to an external Docker network, along with shared dependencies such as message queues. The most convenient approach for this is to start the entire application stack from the [`ffc-demo-development`](https://github.com/DEFRA/ffc-demo-development) repository.

It is also possible to run a limited subset of the application stack. See the [`ffc-demo-development`](https://github.com/DEFRA/ffc-demo-development) Readme for instructions.

### Deploy to Kubernetes

For production deployments, a helm chart is included in the `.\helm` folder. This service connects to an AMQP 1.0 message broker, using credentials defined in [values.yaml](./helm/ffc-demo-payment-service/values.yaml), which must be made available prior to deployment.

Scripts are provided to test the Helm chart by deploying the service, along with an appropriate message broker, into the current Helm/Kubernetes context.

```
# Deploy to current Kubernetes context
scripts/helm/install

# Remove from current Kubernetes context
scripts/helm/delete
```

#### Accessing the pod

By default, the service is not exposed via an endpoint within Kubernetes.

Access may be granted by forwarding a local port to the deployed pod:

```
# Forward local port to the Kubernetes deployment
kubectl port-forward --namespace=ffc-demo deployment/ffc-demo-payment-service 3004:3004
```

Once the port is forwarded, the service can be accessed and tested in the same way as described in the "Test the service" section above.

#### Probes

The service has both an Http readiness probe and an Http liveness probe configured to receive at the below end points.

Readiness: `/healthy`
Liveness: `/healthz`

The readiness probe will test for both the availability of a PostgreSQL database and the two active message queue connections.

Sequelize's `authenticate` function is used to test database connectivity.  This function tries to run a basic query within the database.

## Build pipeline

Builds are managed by Jenkins.

Builds will be deployed into a namespace with the format `mine-support-payment-service-{identifier}` where `{identifier}` is either the release version, the PR number, or the branch name.

A detailed description on the build pipeline and PR work flow is available in the [Defra Confluence page](https://eaflood.atlassian.net/wiki/spaces/FFCPD/pages/1281359920/Build+Pipeline+and+PR+Workflow)

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the license

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
