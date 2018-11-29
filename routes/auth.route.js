const express = require('express');
const router = express.Router();
const newUser = require('../controllers/newUser.controller');
const passport = require('passport');

router.post('/register', newUser.add_new_user, passport.authenticate('local', {
    successRedirect: '/user/profile',
    failureRedirect: '/',
    failureFlash: true
}));
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user/profile',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;