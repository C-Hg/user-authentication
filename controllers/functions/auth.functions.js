const bcrypt = require('bcrypt');

exports.hash_password = async function (password) {
    try{
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

  exports.verifyPassword = async function (password, passwordHash){
    try{
        const match = await bcrypt.compare(password, passwordHash)
        console.log(match);
        return match;
    } catch (e) {
        console.log("error while hashing password");
    }
  }