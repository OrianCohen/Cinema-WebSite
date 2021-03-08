const mongoose = require('mongoose')

let mmoviesSchema = new mongoose.Schema ({
    id: String,
    name: String,
    genres: Array,
    image: Array,
    premiered: Date
});

module.exports = mongoose.model('movies', mmoviesSchema)