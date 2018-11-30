const express = require('express');
const router = express.Router();
const newUser = require('../controllers/newUser.controller');
const passport = require('passport');
const authFunctions = require('../controllers/functions/auth.functions')

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
router.get('/logout', async (req, res) => {
    authFunctions.deleteCookie(req, res);
    req.logout();
    res.redirect('/');
});


module.exports = router;