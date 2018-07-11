const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  person_id: mongoose.Schema.ObjectId,
  IBAN: String,
  bank_id: mongoose.Schema.ObjectId,
  balance: Number,
});

module.exports = mongoose.model('Account', accountSchema);
