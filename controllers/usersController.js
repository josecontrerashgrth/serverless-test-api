// Import the user model from Dynamoose
const User = require('../models/userModel');

// Import the necessary module
const { generateUuid } = require('../utils');

const users = {
    // Create a new user
    createUser: async (req, res) => {
        try {
            const { name, email, age } = req.body;

            // Validate the required fields
            if (!name || !email) {
                return res.status(400).json({ error: 'Fields id, name, and email are required' });
            }

            // Check if the email already exists with scan or query

            const existingUser = await User.scan('email').eq(email).exec();

            // Using the query method with a global secondary index for email
            //const existingUser = await User.query('email').eq(email).using('EmailIndex').exec();

            if (existingUser && existingUser.count > 0) {
                return res.status(409).json({ error: 'User with this email already exists.' });
            }

            // Generate a unique ID for the user
            const userId = generateUuid()
            // Create a new instance of the User model with the data from the body
            const newUser = new User({
                id: userId, // Generate a unique ID for the user
                name,
                email,
                age: age
            });

            // Save the new user in DynamoDB
            await newUser.save();

            // Return the created user (Dynamoose automatically adds createdAt and updatedAt if timestamps: true)
            res.status(201).json({ message: 'User created successfully', user: newUser.toJSON() });
        } catch (error) {
            // Dynamoose may throw validation or DynamoDB errors
            console.error('Error creating user:', error);
            // You can add logic for specific Dynamoose validation errors if needed
            res.status(500).json({ error });
        }
    },

    // Get all users (Scan)
    getUsers: async (req, res) => {
        try {
            // Use the .scan() method of the model to get all items.
            // Warning! .scan() scans the entire table and can be expensive on large tables.
            const result = await User.scan().exec();

            // result is an array of User model instances.
            // Use .map(u => u.toJSON()) to convert them to plain objects.
            res.json({ users: result.map(u => u.toJSON()) });
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ error: 'Internal server error while getting users' });
        }
    },

    // Get a user by ID (Get)
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;

            // Use the .get() method of the model to get an item by its partition key.
            const user = await User.get(id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // user is an instance of the User model. Use .toJSON() for the response.
            res.json({ user: user.toJSON() });
        } catch (error) {
            console.error('Error getting user:', error);
            res.status(500).json({ error: 'Internal server error while getting user' });
        }
    },

    // Update a user
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;

            const updates = req.body;

            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ error: 'No fields to update' });
            }

            // Use the .update() method of the model.
            // The first argument is the key of the item to update.
            // The second argument is the fields to update.
            // Dynamoose automatically handles the UpdateExpression logic.
            const updatedUser = await User.update({ id }, updates);

            // updatedUser is the model instance with the updated data.
            res.json({ message: 'User updated successfully', user: updatedUser.toJSON() });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal server error while updating user' });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            // Use the .delete() method of the model.
            await User.delete(id);

            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal server error while deleting user' });
        }
    }
};

module.exports = users;