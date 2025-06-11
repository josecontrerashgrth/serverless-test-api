const dynamoose = require('dynamoose');

// Config LocalStack
dynamoose.aws.sdk.config.update({
    accessKeyId: 'test', // Credentials dummy for LocalStack
    secretAccessKey: 'test', // Credentials dummy for LocalStack
    region: 'us-east-1', // Any region is fine for LocalStack
    endpoint: 'http://localhost:4566' // Endpoint of LocalStack for DynamoDB
});

console.log('Dynamoose configurado para LocalStack en:', dynamoose.aws.sdk.config.endpoint);

// Exports the Dynamoose instance for use in other modules
module.exports = dynamoose;