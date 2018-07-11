const mongoose = require('mongoose');
const faker = require('faker');
faker.locale = 'tr';
const Promise = require('bluebird');
const fs = require('fs');
const dbConfig = require('./config/dbconfig');
const Bank = require('./models/bank');
const Person = require('./models/person');
const Account = require('./models/account');
const Transaction = require('./models/transaction');

const graph = {
  vertices: [],
  edges: [],
};

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
      bank.save((err, bankData) => {
        if (err) reject(err);
        resultCount += 1;
        const bankNode = {
          _id: bankData._id,
          location: bankData.location,
          lng: bankData.lng,
          lat: bankData.lat,
          type: 'banka',
        };
        graph.vertices.push(bankNode);
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
      person.save((err, personData) => {
        if (err) reject(err);
        resultCount += 1;
        const personNode = {
          _id: personData._id,
          fullName: personData.fullName,
          title: personData.title,
          joinDate: personData.joinDate,
          type: 'kisi',
        };
        graph.vertices.push(personNode);
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
      account.save((err, accData) => {
        if (err) reject(err);
        resultCount += 1;
        const accountNode = {
          _id: accData._id,
          person_id: accData.person_id,
          IBAN: accData.IBAN,
          bank_id: accData.bank_id,
          balance: accData.balance,
          type: 'hesap',
        };
        graph.vertices.push(accountNode);
        const personEdge = {
          source: accData.person_id,
          target: accData._id,
          balance: accData.balance,
          type: 'hesabi',
        };
        graph.edges.push(personEdge);
        const bankEdge = {
          source: accData._id,
          target: accData.bank_id,
          type: 'subesi',
        };
        graph.edges.push(bankEdge);
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
      transaction.save((err, transData) => {
        if (err) reject(err);
        resultCount += 1;
        const transEdge = {
          source: transData.senderAccountId,
          target: transData.receiverAccountId,
          amount: transData.amount,
          type: 'aktardi',
        };
        graph.edges.push(transEdge);
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
              let json = JSON.stringify(graph);
              fs.appendFile('sample.json', json, (err) => {
                if (err) throw err;
              });
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
