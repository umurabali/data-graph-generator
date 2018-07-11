const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  person_id: mongoose.Schema.ObjectId,
  IBAN: String,
  bank_id: mongoose.Schema.ObjectId

});

module.exports = mongoose.model('Account', accountSchema);
