const mongoose = require('mongoose');

const otherBankCustomerSchema = mongoose.Schema({ // Karşı Banka Müşterisi
  id: Number,
  name: String, // AD
  surname: String, // SOYAD
  kbCustomerNo: String, // KB_MUSTERI_NUMARASI
  participantName: String, // KATILIMCI_ADI
});

module.exports = mongoose.model('OtherBankCustomer', otherBankCustomerSchema);
