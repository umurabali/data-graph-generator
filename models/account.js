const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  owner: mongoose.Schema.ObjectId,
  bank: mongoose.Schema.ObjectId,
  balance: Number,
});

module.exports = mongoose.model('Account', accountSchema);
