const mongoose = require('mongoose');
const faker = require('faker');

faker.locale = 'tr';
const Promise = require('bluebird');
const dbConfig = require('./config/dbconfig');
const Bank = require('./models/bank');
const Person = require('./models/person');
const Account = require('./models/account');
const Transaction = require('./models/transaction');

let accountCount = 0;

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loadRandomDbElement(model, modelCount) {
  return new Promise((resolve, reject) => {
    const r = getRandomInteger(0, modelCount);
    model.findOne().skip(r)
      .then((result, err) => {
        resolve(result._id);
      })
      .catch(err => reject(new Error(`Hata ${model}${err}`)));
  });
}


// bank
function createBankData(size) {
  let resultCount = 0;
  console.log('Generating banks...');
  return new Promise((resolve, reject) => {
    for (let i = 0; i < size; i += 1) {
      const bank = new Bank({
        bankname: faker.company.companyName(),
        location: faker.address.city(),
        longitude: faker.address.longitude(),
        latitude: faker.address.latitude(),
      });
      bank.save((err, bankData) => {
        if (err) {
          console.log('ERROR');
          reject(err);
        }
        resultCount += 1;
        if (resultCount === size) {
          console.log('END');
          resolve(true);
        }
      });
    }
  });
}

// kisi
function createPersonData(size) {
  let resultCount = 0;
  console.log('Generating customers...');
  return new Promise((resolve, reject) => {
    for (let i = 0; i < size; i++) {
      const person = new Person({
        customername: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        createdAt: faker.date.past(),
      });
      person.save((err, personData) => {
        if (err) reject(err);
        resultCount += 1;
        if (resultCount === size) {
          console.log('END');
          resolve(true);
        }
      });
    }
  });
}


function createAccountData(size, bankId, personId) {
  let resultCount = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < size; i += 1) {
      const account = new Account({
        owner: personId,
        bank: bankId,
        balance: faker.finance.amount(),
      });
      account.save((err, product) => {
        if (err) {
          reject(new Error('Error in saving account'));
        }
        accountCount += 1;
        resultCount += 1;
        if (resultCount === size) {
          resolve(true);
        }
      });
    }
  });
}

// account
function createRandomAccount(count, bankCount, personCount) {
  let accCount = 0;
  console.log('Generating accounts...');
  return new Promise((resolve, reject) => {
    for (let i = 0; i < count; i += 1) {
      Promise.all([loadRandomDbElement(Bank, bankCount), loadRandomDbElement(Person, personCount)])
        .then((values) => {
          createAccountData(getRandomInteger(1, 4), values[0], values[1])
            .then((result) => {
              if (!result) reject(new Error('Account not generated'));
              accCount += 1;
              if (accCount === count) {
                console.log('END');
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
        sender: senderId,
        receiver: receiverId,
        amount: faker.finance.amount(),
      });
      transaction.save((err, transData) => {
        if (err) reject(err);
        resultCount += 1;
        if (resultCount === size) {
          resolve(true);
        }
      });
    }
  });
}

// transaction
function createRandomTransaction(count) {
  let trnsCount = 0;
  console.log('Generating Transactions...');
  return new Promise((resolve, reject) => {
    for (let i = 0; i < count; i += 1) {
      Promise.all([loadRandomDbElement(Account, accountCount),
        loadRandomDbElement(Account, accountCount)])
        .then((accounts) => {
          createTransactionData(getRandomInteger(1, 10), accounts[0], accounts[1])
            .then((success) => {
              if (!success) reject(new Error('Failing in creating transactions'));
              trnsCount += 1;
              if (trnsCount === count) {
                console.log('END');
                resolve(true);
              }
            });
        });
    }
  });
}

// driver function
function createAllData(bankCount, personCount) {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbConfig.url)
    .then(() => {
      console.log('Successfully connected to the database');
      Promise.all([createBankData(bankCount), createPersonData(personCount)])
        .then(() => {
          createRandomAccount(personCount, bankCount, personCount).then(() => {
            createRandomTransaction(personCount)
              .then(() => {
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
createAllData(50, 30000);
