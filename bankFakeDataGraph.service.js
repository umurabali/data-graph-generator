/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const faker = require('faker');
const Promise = require('bluebird');
const dbConfig = require('./config/dbconfig');
const opSelector = require('./opSelector.js');

faker.locale = 'tr'; // Settings for faker

// Node schemas
const PersonalCustomer = require('./models/personalCustomer');
const CorporateCustomer = require('./models/corporateCustomer');
const OtherBankCustomer = require('./models/otherBankCustomer');

// Link schemas
const EFT = require('./models/eft');
const Transfer = require('./models/transfer');

// Counters for ID's
let customerCount = 0;
const eftCount = 0;
let transferCount = 0;

// Helper Functions
function generateBirthday() { // CHECK
  const birthyear = Math.floor(Math.random() * 101) + 1900;
  const month = Math.floor(Math.random() * 12) + 1;
  const birthday = new Date(birthyear, month);
  return birthday;
}

function generateMartialStatus() { // CHECK
  const status = ['Evli', 'Bekar', 'Dul'];
  return status[Math.floor(Math.random() * status.length)];
}

function generateEducationStatus() { // CHECK
  const status = ['İlkoğretim mezunu', 'Ortaöğretim Mezunu', 'Terk', 'Üniversite Mezunu', 'Üniversite Öğrencisi'];
  return status[Math.floor(Math.random() * status.length)];
}

function generateGender() { // CHECK
  const gender = ['Erkek', 'Kadın', 'Belirtilmemiş'];
  return gender[Math.floor(Math.random() * gender.length)];
}

function bankNameGenerator() { // CHECK
  const banks = ['Türkiye Cumhuriyeti Ziraat Bankası A.Ş.', 'Türkiye Halk Bankası A.Ş.',
    'Türkiye Vakıflar Bankası T.A.O.', 'Adabank A.Ş.',
    'Akbank T.A.Ş.', 'Anadolubank A.Ş.', 'Fibabanka A.Ş.',
    'Şekerbank T.A.Ş.', 'Turkish Bank A.Ş.', 'Türk Ekonomi Bankası A.Ş.',
    'Yapı ve Kredi Bankası A.Ş.', 'Birleşik Fon Bankası A.Ş.', 'Alternatifbank A.Ş.',
    'Bank of China Turkey A.Ş.', 'Burgan Bank A.Ş.', 'Citibank A.Ş.', 'Denizbank A.Ş.',
    'Deutsche Bank A.Ş.', 'HSBC Bank A.Ş.', 'ICBC Turkey Bank A.Ş.', 'ING Bank A.Ş.',
    'MUFG Bank Turkey A.Ş.', 'Odea Bank A.Ş.', 'QNB Finansbank A.Ş.', 'Rabobank A.Ş.',
    'Turkland Bank A.Ş.', 'Türkiye Garanti Bankası A.Ş.',
  ];
  return banks[Math.floor(Math.random() * banks.length)];
}

function loadRandomDbElement(model, modelCount) { // CHECK
  return new Promise((resolve, reject) => {
    const r = Math.floor(Math.random() * modelCount);
    model.findOne().skip(r)
      .then((result) => {
        resolve(result.id);
      })
      .catch(err => reject(new Error(`Hata ${model}${err}`)));
  });
}

async function retrieveIds(keyArr) {
  try {
    const idArr = [];
    if (keyArr[0] === 1) {
      const id1 = await loadRandomDbElement(PersonalCustomer, 5);
      idArr.push(id1);
    } else if (keyArr[0] === 2) {
      const id2 = await loadRandomDbElement(CorporateCustomer, 5);
      idArr.push(id2);
    } else if (keyArr[0] === 3) {
      const id3 = await loadRandomDbElement(OtherBankCustomer, 5);
      idArr.push(id3);
    }

    if (keyArr[1] === 1) {
      const id1 = await loadRandomDbElement(PersonalCustomer, 5);
      idArr.push(id1);
    } else if (keyArr[1] === 2) {
      const id2 = await loadRandomDbElement(CorporateCustomer, 5);
      idArr.push(id2);
    } else if (keyArr[1] === 3) {
      const id3 = await loadRandomDbElement(OtherBankCustomer, 5);
      idArr.push(id3);
    }
    return Promise.resolve(idArr);
  } catch (error) {
    return Promise.reject(new Error(`Error at retrieving ids: ${error}`));
  }
}


// Instance Creators
function generatePersonalCustomer() { // CHECK
  const gender = generateGender();
  return new Promise((resolve, reject) => {
    const personalCustomer = new PersonalCustomer({
      id: customerCount,
      customerNo: Math.floor(Math.random() * 900000000) + 100000000,
      birthday: generateBirthday(),
      surname: faker.name.lastName(gender),
      martialStatus: generateMartialStatus(),
      TCKN: Math.floor(Math.random() * 900000000000) + 100000000000,
      name: faker.name.firstName(gender),
      educationStatus: generateEducationStatus(),
      ownerSBKD: Math.floor(Math.random() * 9000) + 1000,
      guideSBKD: Math.floor(Math.random() * 9000) + 1000,
      stateCode: Math.floor(Math.random() * 81) + 1,
      gender,
    });
    customerCount += 1;
    personalCustomer.save()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(`Error at saving personal customer: ${error}`));
      });
  });
}

function generateCorporateCustomer() { // CHECK
  return new Promise((resolve, reject) => {
    const corporateCustomer = new CorporateCustomer({
      id: customerCount,
      customerNo: Math.floor(Math.random() * 900000000) + 100000000,
      VKN: Math.floor(Math.random() * 9000000000) + 1000000000,
      title: faker.name.jobTitle(),
      ownerSBKD: Math.floor(Math.random() * 9000) + 1000,
      guideSBKD: Math.floor(Math.random() * 9000) + 1000,
      stateCode: Math.floor(Math.random() * 81) + 1,
    });
    customerCount += 1;
    corporateCustomer.save()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(`Error at saving corporate customer: ${error}`));
      });
  });
}

function generateOtherBankCustomer() { // CHECK
  const gender = generateGender();
  return new Promise((resolve, reject) => {
    const otherBankCustomer = new OtherBankCustomer({
      id: customerCount,
      name: faker.name.firstName(gender),
      surname: faker.name.lastName(gender),
      kbCustomerNo: Math.floor(Math.random() * 900000000) + 100000000,
      participantName: bankNameGenerator(),
    });
    customerCount += 1;
    otherBankCustomer.save()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(`Error at generating other bank account: ${error}`));
      });
  });
}

async function generateTransfer() {
  try {
    const senderKey = Math.floor(Math.random() * 3) + 1;
    const receiverKey = Math.floor(Math.random() * 3) + 1;
    const values = await retrieveIds([senderKey, receiverKey]);
    const transferObj = opSelector.selectTransfer();
    let transfer = {};
    if (transferObj.id === 'local') {
      transfer = new Transfer({
        id: transferCount,
        transferForeignCurrAmount: 0,
        costForeignCurrAmount: 0,
        transferType: transferObj.type,
        transferAmountTL: transferObj.amount,
        costAmountTL: transferObj.cost,
        commissionForeignCurrAmount: 0,
        date: transferObj.date,
        commissionTLAmount: transferObj.commission,
        transferForeignCurrCode: null,
        senderId: values[0],
        receiverId: values[1],
      });
    } else if (transferObj.id === 'foreign') {
      if (transferObj.currCode === 'Gram Altın' && transferObj.costCode === 'TRY') {
        transfer = new Transfer({
          id: transferCount,
          transferForeignCurrAmount: transferObj.amount,
          costForeignCurrAmount: 0,
          transferType: transferObj.type,
          transferAmountTL: 0,
          costAmountTL: transferObj.cost,
          commissionForeignCurrAmount: 0,
          date: transferObj.date,
          commissionTLAmount: transferObj.commission,
          transferForeignCurrCode: transferObj.currCode,
          senderId: values[0],
          receiverId: values[1],
        });
      } else {
        transfer = new Transfer({
          id: transferCount,
          transferForeignCurrAmount: transferObj.amount,
          costForeignCurrAmount: transferObj.cost,
          transferType: transferObj.type,
          transferAmountTL: 0,
          costAmountTL: 0,
          commissionForeignCurrAmount: transferObj.commission,
          date: transferObj.date,
          commissionTLAmount: 0,
          transferForeignCurrCode: transferObj.currCode,
          senderId: values[0],
          receiverId: values[1],
        });
      }
    }
    transferCount += 1;
    await transfer.save();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(`Error at generating transfer(Havale): ${error}`));
  }
}

async function generateEFT() {
  try {
    const senderKey = Math.floor(Math.random() * 3) + 1;
    const receiverKey = Math.floor(Math.random() * 3) + 1;
    const values = await retrieveIds([senderKey, receiverKey]);
    const eftObj = opSelector.selectEFT();
    const eft = new EFT({
      id: eftCount,
      costAmount: eftObj.cost,
      date: eftObj.date,
      amount: eftObj.amount,
      senderId: values[0],
      receiverId: values[1],
    });
    eft.save()
      .then((res) => {
        console.log(res);
      });
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(`Error at saving EFT: ${error}`));
  }
}

async function driver() {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(dbConfig.url);
    console.log('Connected to the database');
    const aArr = [];
    const bArr = [];
    const cArr = [];
    for (let i = 0; i < 5; i += 1) {
      const a = generatePersonalCustomer();
      aArr.push(a);
    }
    for (let i = 0; i < 5; i += 1) {
      const b = generateCorporateCustomer();
      bArr.push(b);
    }
    for (let i = 0; i < 5; i += 1) {
      const c = generateOtherBankCustomer();
      cArr.push(c);
    }
    await Promise.all(aArr);
    await Promise.all(bArr);
    await Promise.all(cArr);
    await generateTransfer();
    await generateEFT();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(`Error at driver function: ${error}`));
  }
}

driver()
  .then(() => {
    console.log('DONE');
  })
  .catch((err) => {
    throw new Error(`Something went wrong: ${err}`);
  });
