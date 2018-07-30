const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
  bankname: String,
  location: String,
  longitude: Number,
  latitude: Number,
});

module.exports = mongoose.model('Bank', bankSchema);
