const mongoose = require('mongoose');
const fs = require('fs');
const faker = require('faker');
const Person = require('./models/person.js');
const Account = require('./models/account.js');
const Transaction = require('./models/transaction.js');
const Bank = require('./models/bank.js');
const dbConfig = require('./config/dbconfig');

faker.locale = 'tr';

// connecting to the database,
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
  .then(() => {
    console.log('Successfully connected to the database');
  }).catch((err) => {
    console.log(err);
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
  });
const db = mongoose.connection;
//
// Person generator
// Input: Number of person to generate
async function personGenerator(pNumber) {
  console.log('People are generating...');
  for (let i = 0; i < pNumber; i++) {
    let name = faker.name.findName();
    console.log(name);
    let joinDate = faker.date.past();

    const person = new Person({
      fullName: name,
      joinDate: joinDate,
    });
    await person.save((err) => {
      if (err) console.log(err);
    });
  }
}
async function bankGenerator(bNumber) {
  for (let i = 0; i < bNumber; i++) {
    const location = faker.address.city();

    const bank = new Bank({
      location: location,
    });
    await bank.save((err) => {
      if (err) console.log(err);
    });
  }
}

