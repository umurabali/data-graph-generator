const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
  customername: String,
  email: String,
  createdAt: Date,
});

module.exports = mongoose.model('Person', personSchema);
