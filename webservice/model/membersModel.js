const mongoose = require('mongoose')

let membersSchema = new mongoose.Schema ({
    id: String,
    name: String,
    email: String,
    city: String
});

module.exports = mongoose.model('members', membersSchema)
