const mongoose = require('mongoose');
const faker = require('faker');
const Promise = require('bluebird');
const dbConfig = require('./config/dbconfig');
const Bank = require('./models/bank');
const Person = require('./models/person');
const Account = require('./models/account');
const Transaction = require('./models/transaction');


function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loadRandomDbElement(model) {
  return new Promise((resolve, reject) => {
    model.count()
      .then((data) => {
        const r = getRandomInteger(0, data);
        model.find().limit(1).skip(r)
          .then(result => resolve(result[0]._id))
          .catch(() => reject(new Error(`Hata ${model}`)));
      });
  });
}


// bank
function createBankData(size) {
  let resultCount = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < size; i += 1) {
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
        balance: faker.finance.amount(),
      });
      account.save((err) => {
        if (err) reject(err);
        resultCount += 1;
        if (resultCount === size) {
          resolve(true);
        }
      });
    }
  });
}

function createRandomAccount(count) {
  let accCount = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < count; i += 1) {
      Promise.all([loadRandomDbElement(Bank), loadRandomDbElement(Person)])
        .then((values) => {
          createAccountData(getRandomInteger(1, 4), values[0], values[1])
            .then((result) => {
              if (!result) reject(new Error('Account not generated'));
              accCount += 1;
              if (accCount === count) {
                resolve(true);
              }
            });
        });
    }
  });
}

function createTransactionData(size, senderId, receiverId) {
  let resultCount = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < size; i += 1) {
      const transaction = new Transaction({
        senderAccountId: senderId,
        receiverAccountId: receiverId,
        amount: faker.finance.amount(),
      });
      transaction.save((err) => {
        if (err) reject(err);
        resultCount += 1;
        if (resultCount === size) {
          resolve(true);
        }
      });
    }
  });
}

function createRandomTransaction(count) {
  let trnsCount = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < count; i += 1) {
      Promise.all([loadRandomDbElement(Account), loadRandomDbElement(Account)])
        .then((accounts) => {
          createTransactionData(getRandomInteger(1, 10), accounts[0], accounts[1])
            .then((success) => {
              if (!success) reject(new Error('Failing in creating transactions'));
              trnsCount += 1;
              if (trnsCount === count) {
                console.log('done');
                resolve(true);
              }
            });
        });
    }
  });
}


// transaction


function createAllData(bankCount, personCount) {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbConfig.url)
    .then(() => {
      console.log('Successfully connected to the database');
      Promise.all([createBankData(bankCount), createPersonData(personCount)])
        .then(() => {
          createRandomAccount(personCount).then(() => {
            createRandomTransaction(personCount).then(() => {
              console.log('DONE');
            });
          });
        });
    })
    .catch((err) => {
      console.log(err);
      console.log('Could not connect to the database. Exiting now...');
      process.exit();
    });
}


createAllData(3, 10);
