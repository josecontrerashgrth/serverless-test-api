const dynamoose = require('../db/dynamooseClient');

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

    },
    age: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Adds createdAt y updatedAt
});

// 2. Create the model (table, schema) using the schema
const User = dynamoose.model('test-table', userSchema);

module.exports = User;