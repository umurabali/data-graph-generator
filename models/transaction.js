const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({

  sender: mongoose.Schema.ObjectId,
  receiver: mongoose.Schema.ObjectId,
  amount: Number,
});

module.exports = mongoose.model('Transaction', transactionSchema);
