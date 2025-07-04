import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AuthResources } from './auth-resources';
import { DataResources } from './data-resources';
import { HostingResources } from './hosting-resources';

export class TodoAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create authentication resources
    const auth = new AuthResources(this, 'Auth');

    // Create data resources
    const data = new DataResources(this, 'Data', {
      userPool: auth.userPool,
    });

    // Create hosting resources
    const hosting = new HostingResources(this, 'Hosting');

    // Output the important resources
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: auth.userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: auth.userPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, 'GraphQLApiEndpoint', {
      value: data.api.graphqlUrl,
    });

    new cdk.CfnOutput(this, 'GraphQLApiKey', {
      value: data.api.apiKey || '',
    });

    new cdk.CfnOutput(this, 'WebsiteBucketName', {
      value: hosting.websiteBucket.bucketName,
    });

    new cdk.CfnOutput(this, 'CloudFrontDistributionDomain', {
      value: hosting.distribution.distributionDomainName,
    });
  }
}