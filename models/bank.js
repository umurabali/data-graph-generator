const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({

    Location: String,


});

module.exports = mongoose.model('Bank', bankSchema);