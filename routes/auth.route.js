const express = require('express');
const router = express.Router();
const newUser = require('../controllers/newUser.controller');

router.post('/register', newUser.add_new_user);

module.exports = router;