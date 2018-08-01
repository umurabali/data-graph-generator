const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
  transferForegignCurrAmount: Number, // HAVALE_DOVIZ_TUTARI
  costForeignCurrAmount: Number, // MASRAF_DOVIZ_TUTARI
  transferType: String, // HAVALE_TIPI
  transferAmountTL: Number, // HAVALE_TL_TUTARI
  costAmountTL: Number, // MASRAF_TL_TUTARI
  comissionForeignCurrAmount: Number, // KOMISYON_DOVIZ_TUTARI
  date: Date, // TARIH
  comissionTLAmount: Number, // KOMISYON_TL_TUTARI
  transferForeignCurrCode: String, // HAVALE_DOVIZ_KODU
  senderId: mongoose.Schema.ObjectId,
  receiverId: mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('Havale', transferSchema);
