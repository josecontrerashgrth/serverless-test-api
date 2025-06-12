<!--
title: 'Serverless Framework Node Express API on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API running on AWS Lambda using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node Express API on AWS

This project demonstrates how to develop and deploy a simple Node.js Express API service running on AWS Lambda using the Serverless Framework.

This template configures a single function, `api`, which is responsible for handling all incoming requests using the `httpApi` event. To learn more about `httpApi` event configuration options, please refer to the [httpApi event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api). As the event is configured in a way to accept all incoming requests, the Express.js framework is responsible for routing and handling requests internally. This implementation uses the `serverless-http` package to transform the incoming event request payloads to payloads compatible with Express.js. To learn more about `serverless-http`, please refer to the [serverless-http README](https://github.com/serverless/serverless-http).

---

## 🚀 Quick Start Guide

Follow these steps to set up and run the application in your local environment.

### Step 1: Install Serverless Framework CLI

If you don't already have the Serverless Framework CLI installed globally, this is the first step.

1.  **Open your terminal** and run the following command:

```bash
npm install -g serverless
```

This will install the serverless (or sls) command globally on your system.

### Step 2: Sign Up for Serverless Framework (Optional but Recommended)

While not strictly necessary for local development, signing up and connecting your AWS account with the Serverless Framework allows you to leverage advanced features like observability and cloud deployment management.

1.  **Create a free account** on the Serverless Framework website: https://www.serverless.com/

2.  Once you have an account, you can log in from your terminal:

```bash
serverless login
```
This will open your browser to complete the authentication process.

### Step 3: Clone the Repository and Navigate to the Project

If you haven't already, clone this repository or download the source code and navigate into the project directory.

### Step 4: Local development

Install dependencies with:

```
npm install
```

#### Running LocalStack for AWS Service Emulation

To emulate AWS services locally, you can use [LocalStack](https://github.com/localstack/localstack). Install it with pip3:

```
pip3 install localstack
```

Then start LocalStack by running:

```
localstack start
```

This will launch LocalStack on your Mac, allowing you to test AWS integrations locally.

#### Running LocalStack for AWS Service Emulation

After installing dependecies and running localstack, you can run the service locally by running:

```
serverless offline
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

When you are done developing, don't forget to run `serverless deploy` to deploy the function to the cloud.

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```
Deploying "aws-node-express-api" to stage "dev" (us-east-1)

✔ Service deployed to stack aws-node-express-api-dev (96s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-express-api-dev-api (2.3 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in the following response:

```json
{ "message": "Hello from root!" }
```


