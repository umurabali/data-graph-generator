const mongoose = require('mongoose');

const personSchema = mongoose.Schema({

  fullName: String,
  joinDate: Date,

});

module.exports = mongoose.model('Person', personSchema);
