[![Build Status](https://defradev.visualstudio.com/DEFRA_FutureFarming/_apis/build/status/DEFRA.mine-support-payment-service?branchName=master)](https://defradev.visualstudio.com/DEFRA_FutureFarming/_build/latest?definitionId=611&branchName=master)

# Mine Support Payment Service
Digital service mock to claim public money in the event property subsides into mine shaft.  The payment service subscribes to a message queue for new claims and saves a monthly payment schedule in a Postgresql database.  It also subscribes to the queue for new calculations and updates the value to pay in the database.

# Environment variables
|Name|Description|Required|Default|Valid|Notes|
|---|---|:---:|---|---|---|
|NODE_ENV|Node environment|no|development|development,test,production||
|PORT|Port number|no|3004|||
|POSTGRES_HOST|Postgres host name|yes|||
|POSTGRES_PORT|Postgres port|yes|||
|POSTGRES_DB|Postgres database name|yes||||
|POSTGRES_USERNAME|Postgres username|yes||||
|POSTGRES_PASSWORD|Postgres password|yes||||
|MESSAGE_QUEUE_HOST|Host address of message queue|no|localhost|||
|MESSAGE_QUEUE_PORT|Message queue port|no|5672|||
|MESSAGE_QUEUE_RECONNECT_LIMIT|Reconnection limit for message queue|no|10|||
|MESSAGE_QUEUE_TRANSPORT|Message queue transport|no|tcp|||
|SCHEDULE_QUEUE_ADDRESS|Message queue name for receipt of claims for scheduling|no|schedule|||
|SCHEDULE_QUEUE_USER|Message queue username|yes||||
|SCHEDULE_QUEUE_PASSWORD|Message queue password|yes||||
|PAYMENT_QUEUE_ADDRESS|Message queue name for receipt of claim calculations|no|payment|||
|PAYMENT_QUEUE_USER|Message queue username|yes||||
|PAYMENT_QUEUE_PASSWORD|Message queue password|yes||||

# Prerequisites
Node v10+
PostgreSQL
Message queue - AMQP 1.0 protocol

# Running the application in containers
The application is designed to run as a container via Docker Compose or Kubernetes (with Helm). A helm chart is included in the `.\helm` folder.

A utility script is provided to aid in deploying to a local cluster.

First build the container so it is available in the local Docker registry

 `./scripts/build-image`
 
 Then deploy to the current Helm context

 `./scripts/deploy-local`

 A local Postgres database will need to be installed and setup with the username and password defined in the [values.yaml](./helm/values.yaml) for the service to operate.

It is much quicker to develop using docker compose locally than to set up a local environment.
The [./scripts/start](./scripts/start) script will run the migrations, start a nodemon session watching for changes in `.js` files, and attach to the running service. Logs will be tailed and the service may be brought down by pressing `Ctrl + C`.

The start script will also create the required `mine-support` network so that it can communicate with other Mine Support services running alongside it through docker-compose.

The `start` scripts uses two override files, [docker-compose.migrate.yaml](docker-compose.migrate.yaml) runs the migration, and [docker-compose.local.yaml](docker-compose.local.yaml) starts the service, mounting folders and setting up networking. Attempting to do this in a single script prevented the port mappings working.

The script [wait-for](./wait-for) is used to ensure the Postgres database is accepting connections before running the migration. Further details on `wait-for` are available [here](https://github.com/gesellix/wait-for).

For the volume mounts to work correct via WSL the application needs to be run from `/c/...` rather than `/mnt/c/..`.

You may need to create a directory at `/c` then mount it via `sudo mount --bind /mnt/c /c` to be able to change to `/c/..`

Alternatively automounting may be set up. Further details available [here](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly).

# How to run tests
Tests are written using Jest and are intended to be run in an container.
The script used by the continuous integration build may be run via the script [./scripts/test](./scripts/test).

Tests may also be run locally but require a Postgres database for integration tests, and the following environment variables setting: `POSTGRES_USERNAME`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_HOST`

Local tests can be run with the command:

`npm run test`
