const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

// Config DynamoDB local
const isLocal = process.env.IS_OFFLINE || process.env.NODE_ENV === 'development';

const dynamoDbConfig = {
    region: 'us-east-1',
    ...(isLocal && {
        endpoint: 'http://localhost:4566',
        credentials: {
            accessKeyId: 'test',
            secretAccessKey: 'test'
        }
    })
};

const client = new DynamoDBClient(dynamoDbConfig);
const docClient = DynamoDBDocumentClient.from(client);
// Exports the DynamoDB Document Client for use in other modules
exports.docClient = docClient;