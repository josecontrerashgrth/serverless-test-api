const express = require('express');
const usersController = require('../controllers/usersController'); // Assuming you have a usersController.js file

const router = express.Router();

//User routes
router.get('/users', usersController.getUsers);
router.post('/user', usersController.createUser);
router.get('/user/:id', usersController.getUserById);
router.put('/user/:id', usersController.updateUser);
router.delete('/user/:id', usersController.deleteUser);



module.exports = router;