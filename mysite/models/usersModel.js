const mongoose = require('mongoose')

let usersSchema = new mongoose.Schema ({
    userName: String,
    password: String
});

module.exports = mongoose.model('users', usersSchema)