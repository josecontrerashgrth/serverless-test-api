const dynamoose = require('dynamoose');

// 1. Define user schema
const userSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            "name": "EmailIndex", //Define a global secondary index for email
            "type": "global", // Type of index
            "project": true,
        }
    },
    age: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Adds createdAt y updatedAt
});

// 2. Create the model (table, schema) using the schema
const User = dynamoose.model('users', userSchema)

// 3. Export the User model
module.exports = User;

