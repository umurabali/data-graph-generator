const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({

    location: String


});

module.exports = mongoose.model('Bank', bankSchema);