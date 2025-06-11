const { PutCommand, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { docClient } = require('../db/_dynamoClient');

// Crete a new user
const users = {
    createUser: async (req, res) => {
        try {
            const { id, name, email, age } = req.body;

            if (!id || !name || !email) {
                return res.status(400).json({ error: 'Los campos id, name y email son requeridos' });
            }

            const params = {
                TableName: 'test-table',
                Item: {
                    id,
                    name,
                    email,
                    age: age || 0
                }
            };

            await docClient.send(new PutCommand(params));
            res.status(201).json({ message: 'Usuario creado exitosamente', user: params.Item });
        } catch (error) {
            console.error('Error creando usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // List all users
    getUsers: async (req, res) => {
        try {
            const params = {
                TableName: 'test-table'
            };

            const result = await docClient.send(new ScanCommand(params));
            res.json({ users: result.Items });
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener un usuario por ID
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const params = {
                TableName: 'test-table',
                Key: { id }
            };

            const result = await docClient.send(new GetCommand(params));

            if (!result.Item) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json({ user: result.Item });
        } catch (error) {
            console.error('Error obteniendo usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Update an user by id
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, age } = req.body;

            const updateExpression = [];
            const expressionAttributeValues = {};

            if (name) {
                updateExpression.push('name = :name');
                expressionAttributeValues[':name'] = name;
            }

            if (email) {
                updateExpression.push('email = :email');
                expressionAttributeValues[':email'] = email;
            }

            if (age !== undefined) {
                updateExpression.push('age = :age');
                expressionAttributeValues[':age'] = age;
            }

            if (updateExpression.length === 0) {
                return res.status(400).json({ error: 'No hay campos para actualizar' });
            }

            const params = {
                TableName: 'test-table',
                Key: { id },
                UpdateExpression: `SET ${updateExpression.join(', ')}`,
                ExpressionAttributeValues: expressionAttributeValues,
                ReturnValues: 'ALL_NEW'
            };

            const result = await docClient.send(new UpdateCommand(params));
            res.json({ message: 'Usuario actualizado exitosamente', user: result.Attributes });
        } catch (error) {
            console.error('Error actualizando usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Delete an user by id
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            const params = {
                TableName: 'test-table',
                Key: { id }
            };

            await docClient.send(new DeleteCommand(params));
            res.json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            console.error('Error eliminando usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = users;