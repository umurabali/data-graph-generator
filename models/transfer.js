const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
  id: Number,
  transferForeignCurrAmount: Number, // HAVALE_DOVIZ_TUTARI
  costForeignCurrAmount: Number, // MASRAF_DOVIZ_TUTARI
  transferType: String, // HAVALE_TIPI
  transferAmountTL: Number, // HAVALE_TL_TUTARI
  costAmountTL: Number, // MASRAF_TL_TUTARI
  commissionForeignCurrAmount: Number, // KOMISYON_DOVIZ_TUTARI
  date: Date, // TARIH
  commissionTLAmount: Number, // KOMISYON_TL_TUTARI
  transferForeignCurrCode: String, // HAVALE_DOVIZ_KODU
  senderId: Number,
  receiverId: Number,
});

module.exports = mongoose.model('Transfer', transferSchema);
