const User = require('../../models/user.model');

exports.check_user_by_username = async function (username) {
    try {
        let user = await User.findOne({ username: username }, function handleSearch(err) {
            if (err) return handleError(err);
        });
        return user;
    } catch (e) {
        console.log("error while checking db");
        return
    }

}

exports.create_user = async function (username, password) {
    try {
        let user = await User.create({ username: username, password: password });
        await user.save(function handleCreate(err, user) {
            if (err) return handleError(err);
            console.log("New user added to the database");
        })  
        return user;      
    } catch (e) {
        console.log("error while registering user into db");
    }
}