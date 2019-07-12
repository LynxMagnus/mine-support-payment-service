[![Build status](https://defradev.visualstudio.com/DEFRA_FutureFarming/_apis/build/status/defra-ff-mine-support-payment-service-spike)](https://defradev.visualstudio.com/DEFRA_FutureFarming/_build/latest?definitionId=0)

# Mine Support Payment Service
Digital service mock to claim public money in the event property subsides into mine shaft.  The payment service subscribes to a message queue for new claims and saves a monthly payment schedule in a Postgresql database.  It also subscribes to the queue for new calculations and updates the value to pay in the database.

# Environment variables
|Name|Description|Required|Default|Valid|Notes|
|---|---|:---:|---|---|---|
|NODE_ENV|Node environment|no|development|development,test,production||
|PORT|Port number|no|3004|||
|POSTGRES_USERNAME|Postgres username|yes||||
|POSTGRES_PASSWORD|Postgres password|yes||||
|MINE_SUPPORT_MESSAGE_QUEUE|Message queue url|no|amqp://localhost|||

# Prerequisites
Node v10+
PostgreSQL
Message queue - amqp protocol

# Running the application
The application is ready to run:

`$ node index.js`

Alternatively the project can be run in a container through the docker-compose.yaml file.

# Kubernetes
The service has been developed with the intention of running in Kubernetes.  A helm chart is included in the `.\helm` folder.

# How to run tests
Unit tests are written in Lab and can be run with the following command:

`npm run test`
