const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({

    location: String,
    lng: Number,
    lat: Number,
});

module.exports = mongoose.model('Bank', bankSchema);