const bcrypt = require('bcrypt');

exports.hash_password = async function (password) {
    try {
        const hashed = await bcrypt.hash(password, 12)
        return hashed;
    } catch (e) {
        console.log("error while hashing password");
    }
}

exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

exports.verifyPassword = async function (password, passwordHash) {
    try {
        const match = await bcrypt.compare(password, passwordHash)
        return match;
    } catch (e) {
        console.log("error while hashing password");
    }
}

exports.setCookie = function (req, res, next) {
    // check if client sent cookie and is authenticated
    let cookie = req.cookies.username;
    if (cookie === undefined && req.user)
    {
      // no: set a new cookie
      res.cookie('username', req.user.username, { maxAge: 9000000, httpOnly: false, sameSite: true });
    } 
    next(); // <-- important!
};

exports.deleteCookie = function (req, res, next) {
    let cookie = req.cookies.username;
    if (cookie){
        res.clearCookie('username');
    }
}