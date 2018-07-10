const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  person_id: String,
  IBAN: String,
  bank_id: String

});

module.exports = mongoose.model('Account', accountSchema);
