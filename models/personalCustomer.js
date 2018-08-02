const mongoose = require('mongoose');

const personalCustomerSchema = mongoose.Schema({
  id: Number,
  customerNo: Number, // MUS_NO
  birthday: Date, // DOGUM_TRH
  surname: String, // SOYAD
  martialStatus: String, // MEDENI_DURUM
  TCKN: Number, // TC KIMLIK NUMARASI
  name: String, // AD
  educationStatus: String, // OGRENIM_DURUM
  ownerSBKD: Number, // MUS_SAHIP_SBKD
  guideSBKD: Number, // MUS_KILAVUZ_SBKD
  stateCode: Number, // YERLESIK_IL_KOD
  gender: String, // CINSIYET
});

module.exports = mongoose.model('PersonalCustomer', personalCustomerSchema);
