const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({

  senderAccountId: mongoose.Schema.ObjectId,
  receiverAccountId: mongoose.Schema.ObjectId,
  amount: Number,
});

module.exports = mongoose.model('Transaction', transactionSchema);
