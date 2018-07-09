const mongoose = require('mongoose');
const fs = require('fs');
const faker = require('faker');
const Person = require('./models/person.js');
const Account = require('./models/account.js');
const Transaction = require('./models/transaction.js');
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
    const name = faker.name.findName();
    const joinDate = faker.date.past();

    const person = new Person({
      name,
      joinDate,
    });
    await person.save(function (err) {
        if (err) console.log(err)
    });
  }
}




