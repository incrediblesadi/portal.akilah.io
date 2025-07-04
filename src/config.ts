import { Amplify } from 'aws-amplify';

// Try to import aws-exports.js if it exists, otherwise use a default configuration
let awsConfig;
try {
  awsConfig = require('./aws-exports').default;
} catch (e) {
  console.warn('aws-exports.js not found. Using default configuration for development.');
  awsConfig = {
    // Default configuration for local development
    aws_project_region: 'us-east-1',
    aws_cognito_region: 'us-east-1',
    aws_user_pools_id: 'PLACEHOLDER_USER_POOL_ID',
    aws_user_pools_web_client_id: 'PLACEHOLDER_USER_POOL_CLIENT_ID',
    aws_api_endpoint: 'http://localhost:3000',
  };
}

// Configure Amplify
Amplify.configure({
  ...awsConfig,
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: awsConfig.aws_api_endpoint,
        region: awsConfig.aws_project_region,
        custom_header: async () => {
          return { Authorization: `Bearer ${(await Amplify.Auth.currentSession()).getIdToken().getJwtToken()}` };
        },
      },
    ],
  },
});

export default awsConfig;