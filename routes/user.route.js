const express = require('express');
const router = express.Router();
const allUsers = require('../controllers/allUsers.controller');

router.get('/users', allUsers.retrieve_all_users);

module.exports = router;