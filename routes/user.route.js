const express = require('express');
const router = express.Router();
const allUsers = require('../controllers/allUsers.controller');
const authFunctions = require('../controllers/functions/auth.functions');

router.get('/users', allUsers.retrieve_all_users);
router.get('/profile',
    authFunctions.ensureAuthenticated,
    (req, res) => {
        res.sendFile(process.cwd() + '/views/profile.html');
    }
)

module.exports = router;