const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({

  senderAccountId: String,
  receiverAccountId: String,

});

module.exports = mongoose.model('Transaction', transactionSchema);
