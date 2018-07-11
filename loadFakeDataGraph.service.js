const mongoose = require('mongoose');
const faker = require('faker');
const Promise = require('bluebird');
const dbConfig = require('./config/dbconfig');
const Bank = require('./models/bank');
const Person = require('./models/person');
const Account = require('./models/account');


function getRandomInteger(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function loadRandomDbElement(model) {
  return new Promise((resolve, reject) => {
    model.count()
      .then((data) => {
        const r = getRandomInteger(0, data);
        model.find().limit(1).skip(r)
          .then(result => resolve(result[0]._id))
          .catch(() => reject(new Error('Hata')));
      });
  });
};


// bank
function createBankData(size) {
  let resultCount = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < size; i++) {
      const bank = new Bank({
        location: faker.address.city(),
        lng: faker.address.longitude(),
        lat: faker.address.latitude(),
      });
      bank.save((err) => {
        if (err) reject(err);
        resultCount += 1;
        if (resultCount === size) {
          resolve(true);
        }
      });
    }
  });
}

// kisi
function createPersonData(size) {
  let resultCount = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < size; i++) {
      const person = new Person({
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        title: faker.name.title(),
        joinDate: faker.date.past(),
      });
      person.save((err) => {
        if (err) reject(err);
        resultCount += 1;
        if (resultCount === size) {
          resolve(true);
        }
      });
    }
  });
}

// account
function createAccountData(size, bank_id, person_id) {
  let resultCount = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < size; i++) {
      const account = new Account({
        person_id,
        bank_id,
        IBAN: faker.finance.iban(),
      });
      account.save((err) => {
        if (err) reject(err);
        console.log(i);
        resultCount += 1;
        if (resultCount === size) {
          resolve(true);
        }
      });
    }
  });
}
// account
// transaction


function createAllData() {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbConfig.url)
    .then(() => {
      console.log('Successfully connected to the database');
      Promise.all([createBankData(100), createPersonData(100)]).then(() => {
        for (let i = 0; i < 100; i += 1) {
          Promise.all([loadRandomDbElement(Bank), loadRandomDbElement(Person)])
            .then(values => createAccountData(getRandomInteger(1, 4), values[0], values[1]).then(() => console.log('done')));
        }
      });
    })
    .catch((err) => {
      console.log(err);
      console.log('Could not connect to the database. Exiting now...');
      process.exit();
    });
}


createAllData();
