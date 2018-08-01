const mongoose = require('mongoose');

const eftSchema = mongoose.Schema({
  costAmount: Number, // MASRAF_TUTAR
  date: Date, // TARIH
  amount: Number, // TUTAR
  senderId: mongoose.Schema.ObjectId,
  receiverId: mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('EFT', eftSchema);
