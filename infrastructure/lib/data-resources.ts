import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export interface DataResourcesProps {
  userPool: cognito.UserPool;
}

export class DataResources extends Construct {
  public readonly api: apigateway.RestApi;
  public readonly todoTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props: DataResourcesProps) {
    super(scope, id);

    // Create a DynamoDB table for Todo items
    this.todoTable = new dynamodb.Table(this, 'TodoTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production
    });

    // Create a Lambda function to handle API requests
    const todoHandler = new lambda.Function(this, 'TodoHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const AWS = require('aws-sdk');
        const docClient = new AWS.DynamoDB.DocumentClient();
        const tableName = process.env.TABLE_NAME;
        
        exports.handler = async (event) => {
          console.log('Event: ', event);
          
          const { httpMethod, path, body, pathParameters } = event;
          
          try {
            // GET /todos
            if (httpMethod === 'GET' && path === '/todos') {
              const result = await docClient.scan({ TableName: tableName }).promise();
              return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result.Items)
              };
            }
            
            // GET /todos/{id}
            if (httpMethod === 'GET' && pathParameters && pathParameters.id) {
              const result = await docClient.get({
                TableName: tableName,
                Key: { id: pathParameters.id }
              }).promise();
              
              return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result.Item)
              };
            }
            
            // POST /todos
            if (httpMethod === 'POST' && path === '/todos') {
              const item = JSON.parse(body);
              const id = Date.now().toString();
              
              await docClient.put({
                TableName: tableName,
                Item: {
                  id,
                  content: item.content,
                  createdAt: new Date().toISOString()
                }
              }).promise();
              
              return {
                statusCode: 201,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, content: item.content })
              };
            }
            
            // PUT /todos/{id}
            if (httpMethod === 'PUT' && pathParameters && pathParameters.id) {
              const item = JSON.parse(body);
              
              await docClient.update({
                TableName: tableName,
                Key: { id: pathParameters.id },
                UpdateExpression: 'set content = :content, updatedAt = :updatedAt',
                ExpressionAttributeValues: {
                  ':content': item.content,
                  ':updatedAt': new Date().toISOString()
                }
              }).promise();
              
              return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: pathParameters.id, content: item.content })
              };
            }
            
            // DELETE /todos/{id}
            if (httpMethod === 'DELETE' && pathParameters && pathParameters.id) {
              await docClient.delete({
                TableName: tableName,
                Key: { id: pathParameters.id }
              }).promise();
              
              return {
                statusCode: 204,
                headers: { 'Content-Type': 'application/json' },
                body: ''
              };
            }
            
            return {
              statusCode: 400,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: 'Invalid request' })
            };
          } catch (error) {
            console.error('Error: ', error);
            return {
              statusCode: 500,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: 'Internal server error' })
            };
          }
        };
      `),
      environment: {
        TABLE_NAME: this.todoTable.tableName,
      },
    });
    
    // Grant the Lambda function read/write permissions to the DynamoDB table
    this.todoTable.grantReadWriteData(todoHandler);
    
    // Create an API Gateway REST API
    this.api = new apigateway.RestApi(this, 'TodoApi', {
      restApiName: 'Todo API',
      description: 'API for managing todo items',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });
    
    // Create a Cognito authorizer
    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'TodoAuthorizer', {
      cognitoUserPools: [props.userPool],
    });
    
    // Create API resources and methods
    const todos = this.api.root.addResource('todos');
    
    // GET /todos
    todos.addMethod('GET', new apigateway.LambdaIntegration(todoHandler), {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });
    
    // POST /todos
    todos.addMethod('POST', new apigateway.LambdaIntegration(todoHandler), {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });
    
    // Individual todo item resource
    const todo = todos.addResource('{id}');
    
    // GET /todos/{id}
    todo.addMethod('GET', new apigateway.LambdaIntegration(todoHandler), {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });
    
    // PUT /todos/{id}
    todo.addMethod('PUT', new apigateway.LambdaIntegration(todoHandler), {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });
    
    // DELETE /todos/{id}
    todo.addMethod('DELETE', new apigateway.LambdaIntegration(todoHandler), {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });
  }
}