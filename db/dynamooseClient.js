const dynamoose = require('dynamoose');


/* 
// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": "AKID",
        "secretAccessKey": "SECRET"
    },
    "region": "us-east-1"
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);
 */

// Set DynamoDB instance to the default AWS SDK DynamoDB instance
dynamoose.model.defaults = {
    create: true, // Create table if it does not exist
    update: true, // Update table if it exists
    waitForActive: {
        enabled: true,
        check: 1000,
        timeout: 60000
    }
};

// Set the DynamoDB instance to use the local DynamoDB emulator
dynamoose.aws.ddb.local("http://localhost:4566");
