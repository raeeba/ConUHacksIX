const express = require('express');
const server = require('./server');

const router = express.Router();

// POST Register User
router.post('/register', server.registerUser);

// POST Login User
router.post('/login', server.loginUser);

// POST Add Task
router.post('/add-task', server.addTaskToUser);

module.exports = router;
