const mongoose = require('mongoose');

const eftSchema = mongoose.Schema({
  id: Number,
  costAmount: Number, // MASRAF_TUTAR
  date: Date, // TARIH
  amount: Number, // TUTAR
  senderId: Number,
  receiverId: Number,
});

module.exports = mongoose.model('EFT', eftSchema);
