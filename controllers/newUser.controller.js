const User = require('../models/user.model');
const dbFunctions = require('./functions/database.functions');

exports.add_new_user = async function(req, res) {
    //if username already taken, return error message
    let isUsernameTaken = await dbFunctions.check_user_by_username(req.body.username);
    if (isUsernameTaken){
        res.send("Username not available");
        return
    }
        
    //create user with hashed password
    let user = await dbFunctions.create_user(req.body.username, req.body.password);
    console.log(user);
    res.send(user);
    return
    //login user and redirect to /profile

}