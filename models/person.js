const mongoose = require('mongoose');

const personSchema = mongoose.Schema({

  fullName: String,
  title: String,
  joinDate: Date,
});

module.exports = mongoose.model('Person', personSchema);
