const express = require('express');
// Import the Controllers
const usersController = require('../controllers/usersController');

const router = express.Router();

//User routes
router.get('/users', usersController.getUsers);
router.post('/user', usersController.createUser);
router.get('/user/:id', usersController.getUserById);
router.put('/user/:id', usersController.updateUser);
router.delete('/user/:id', usersController.deleteUser);



module.exports = router;