const bcrypt = require('bcrypt');

exports.hash_password = async function (password) {
    try {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 12, function handleEncrypt(err, hash) {
                if (err) reject (err);
                resolve(hash);
            })
        })
        return hashedPassword;
    } catch (e) {
        console.log("error while hashing password");
    }
}