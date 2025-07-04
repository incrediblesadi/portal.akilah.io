# Full Stack Todo App with AWS

This repository provides a full stack Todo application using React+Vite for the frontend and AWS services for the backend. The application can be deployed to your own AWS instance.

## Overview

This application is a simple Todo app that allows users to create, read, and delete todo items. It uses the following technologies:

- **Frontend**: React, TypeScript, Vite
- **Backend**: AWS services (Cognito, API Gateway, Lambda, DynamoDB)
- **Infrastructure**: AWS CDK (Cloud Development Kit)

## Features

- **Authentication**: Secure user authentication with Amazon Cognito
- **API**: RESTful API with AWS API Gateway and Lambda
- **Database**: Persistent storage with Amazon DynamoDB
- **Hosting**: Static website hosting with Amazon S3 and CloudFront

## Prerequisites

Before deploying this application, you need to have the following:

1. An AWS account
2. AWS CLI installed and configured with your credentials
3. Node.js and npm installed
4. AWS CDK installed globally (`npm install -g aws-cdk`)

## Deployment Instructions

First, make the deployment scripts executable:

```bash
chmod +x infrastructure/deploy.sh
chmod +x deploy-frontend.sh
```

### 1. Deploy the Backend Infrastructure

First, deploy the backend infrastructure to your AWS account:

```bash
# Navigate to the infrastructure directory
cd infrastructure

# Install dependencies
npm install

# Bootstrap the CDK (only needed once per AWS account/region)
npx cdk bootstrap

# Deploy the infrastructure
./deploy.sh
```

This will create all the necessary AWS resources and generate a configuration file (`aws-exports.js`) in the `src` directory.

### 2. Deploy the Frontend

After deploying the backend, deploy the frontend:

```bash
# Navigate back to the root directory
cd ..

# Install dependencies
npm install

# Deploy the frontend
./deploy-frontend.sh
```

This will build the frontend application and deploy it to the S3 bucket created in the previous step.

## Local Development

To run the application locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Note: For local development, you need to have the `aws-exports.js` file in the `src` directory. This file is generated when you deploy the backend infrastructure.

## Cleaning Up

To avoid incurring charges, remember to delete the resources when you're done:

```bash
# Navigate to the infrastructure directory
cd infrastructure

# Destroy the infrastructure
npx cdk destroy
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.