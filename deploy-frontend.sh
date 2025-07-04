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

# Check if aws-exports.js exists
if [ ! -f "./src/aws-exports.js" ]; then
    echo "aws-exports.js not found. Please deploy the backend first."
    exit 1
fi

# Get the S3 bucket name from aws-exports.js
BUCKET_NAME=$(grep -o 'aws_website_bucket.*' ./src/aws-exports.js | cut -d'"' -f3)

if [ -z "$BUCKET_NAME" ]; then
    echo "Could not find the S3 bucket name in aws-exports.js"
    exit 1
fi

# Build the frontend
echo "Building the frontend..."
npm run build

# Deploy to S3
echo "Deploying to S3 bucket: $BUCKET_NAME"
aws s3 sync ./dist s3://$BUCKET_NAME --delete

# Invalidate CloudFront cache
DISTRIBUTION_ID=$(aws cloudformation describe-stacks --stack-name TodoAppStack --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" --output text)

if [ -n "$DISTRIBUTION_ID" ]; then
    echo "Invalidating CloudFront cache for distribution: $DISTRIBUTION_ID"
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
fi

CLOUDFRONT_DOMAIN=$(aws cloudformation describe-stacks --stack-name TodoAppStack --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionDomain'].OutputValue" --output text)

echo "Deployment completed successfully!"
echo "Your app is now available at: https://$CLOUDFRONT_DOMAIN"