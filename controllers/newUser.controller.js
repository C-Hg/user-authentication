const dbFunctions = require('./functions/database.functions');
const authFunctions = require('./functions/auth.functions');

exports.add_new_user = async function(req, res, next) {
    //if username already taken, return error message
    let isUsernameTaken = await dbFunctions.check_user_by_username(req.body.username);
    if (isUsernameTaken){
        res.send("Username not available");
        return
    }
        
    //create user with hashed password
    let hashedPassword = await authFunctions.hash_password(req.body.password);
    let user = await dbFunctions.create_user(req.body.username, hashedPassword);
    
    next();
}