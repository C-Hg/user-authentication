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

exports.cookieSetter = function (req, res, next) {
    // check if client sent cookie and is authenticated
    let cookie = req.cookies.username;
    if (cookie === undefined && req.user)
    {
      // no: set a new cookie
      res.cookie('username', req.user.username, { maxAge: 9000000, httpOnly: true });
      console.log('cookie created successfully');
    } 
    else
    {
      // yes, cookie was already present 
      console.log('cookie exists or username undefined', cookie);
    } 
    next(); // <-- important!
};