const mongoose = require('mongoose');

const corporateCustomerSchema = mongoose.Schema({
  id: Number,
  customerNo: Number, // MUS_NO
  VKN: Number, // VERGI KIMLIK NUMARASI
  title: String, // UNVAN
  ownerSBKD: Number, // MUS_SAHIP_SBKD
  guideSBKD: Number, // MUS_KILAVUZ_SBKD
  stateCode: Number, // YERLESIK_IL_KD
});

module.exports = mongoose.model('CorporateCustomer', corporateCustomerSchema);
