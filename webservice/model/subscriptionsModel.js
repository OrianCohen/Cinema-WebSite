const mongoose = require('mongoose')

let subscriptionSchema = new mongoose.Schema ({
    id: String,
    memberid: String,
    movies: Array,
});

module.exports = mongoose.model('subscriptions', subscriptionSchema)