#!/bin/bash

# Exit on error
set -e

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "AWS credentials are not configured. Please run 'aws configure' first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the CDK app
echo "Building the CDK app..."
npm run build

# Deploy the CDK app
echo "Deploying the CDK app..."
npm run cdk deploy -- --require-approval never

# Get the outputs
echo "Getting the outputs..."
OUTPUTS_FILE="../src/aws-exports.js"

# Create the outputs file
echo "Creating the outputs file..."
aws cloudformation describe-stacks --stack-name TodoAppStack --query "Stacks[0].Outputs" --output json > temp-outputs.json

# Extract the values
USER_POOL_ID=$(jq -r '.[] | select(.OutputKey=="UserPoolId") | .OutputValue' temp-outputs.json)
USER_POOL_CLIENT_ID=$(jq -r '.[] | select(.OutputKey=="UserPoolClientId") | .OutputValue' temp-outputs.json)
API_ENDPOINT=$(jq -r '.[] | select(.OutputKey=="TodoApiEndpoint") | .OutputValue' temp-outputs.json)
WEBSITE_BUCKET=$(jq -r '.[] | select(.OutputKey=="WebsiteBucketName") | .OutputValue' temp-outputs.json)
CLOUDFRONT_DOMAIN=$(jq -r '.[] | select(.OutputKey=="CloudFrontDistributionDomain") | .OutputValue' temp-outputs.json)

# Create the aws-exports.js file
cat > $OUTPUTS_FILE << EOL
// This file is auto-generated during deployment
// Do not modify this file manually

const awsmobile = {
    "aws_project_region": "${AWS_REGION:-us-east-1}",
    "aws_cognito_region": "${AWS_REGION:-us-east-1}",
    "aws_user_pools_id": "${USER_POOL_ID}",
    "aws_user_pools_web_client_id": "${USER_POOL_CLIENT_ID}",
    "aws_api_endpoint": "${API_ENDPOINT}",
    "aws_cloud_front_domain": "${CLOUDFRONT_DOMAIN}",
    "aws_website_bucket": "${WEBSITE_BUCKET}"
};

export default awsmobile;
EOL

# Clean up
rm temp-outputs.json

echo "Deployment completed successfully!"
echo "Frontend configuration file created at: $OUTPUTS_FILE"
echo ""
echo "To deploy the frontend, run:"
echo "npm run build"
echo "aws s3 sync dist s3://${WEBSITE_BUCKET}"
echo ""
echo "Your app will be available at: https://${CLOUDFRONT_DOMAIN}"