[![Build Status](https://defradev.visualstudio.com/DEFRA_FutureFarming/_apis/build/status/DEFRA.mine-support-payment-service?branchName=master)](https://defradev.visualstudio.com/DEFRA_FutureFarming/_build/latest?definitionId=611&branchName=master)

# Mine Support Payment Service

Digital service mock to claim public money in the event property subsides into mine shaft.  The payment service subscribes to a message queue for new claims and saves a monthly payment schedule in a Postgresql database.  It also subscribes to the queue for new calculations and updates the value to pay in the database.

# Environment variables

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

# Prerequisites

- Node v10+
- Access to a PostgreSQL database
- Access to an AMQP 1.0 compatible message queue service

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

The application is designed to run as a container via Docker Compose or Kubernetes (with Helm).

## Using Docker Compose

A set of convenience scripts are provided for local development and running via Docker Compose.

```
# Build service containers
scripts/build

# Start the service and attach to running containers (press `ctrl + c` to quit)
scripts/start

# Stop the service and remove Docker volumes and networks created by the start script
scripts/stop
```

Any arguments provided to the build and start scripts are passed to the Docker Compose `build` and `up` commands, respectively. For example:

```
# Build without using the Docker cache
scripts/build --no-cache

# Start the service without attaching to containers
scripts/start --detach
```

This service depends on an external Docker network named `mine-support` to communicate with other Mine Support services running alongside it. The start script will automatically create the network if it doesn't exist and the stop script will remove the network if no other containers are using it.

The external network is declared in a secondary Docker Compose configuration (referenced by the above scripts) so that this service can be run in isolation without creating an external Docker network.

This service also depends on an AMQP 1.0+ compatible message queue service. One is declared in `docker-compose.override.yml` so that this service can be run without external dependencies. To do this, use the convenience script:

`scripts/start-isolated`

## Using Kubernetes

The service has been developed with the intention of running on Kubernetes in production.  A helm chart is included in the `.\helm` folder.

Running via Helm requires a local Postgres database to be installed and setup with the username and password defined in the [values.yaml](./helm/values.yaml). It is much simpler to develop using Docker Compose locally than to set up a local Kubernetes environment. See above for instructions.

To test Helm deployments locally, a [deploy](./deploy) script is provided.

```
# Build service containers
scripts/build

# Deploy to the current Helm context
scripts/deploy
```
