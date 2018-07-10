const mongoose = require('mongoose');
const fs = require('fs');
const faker = require('faker');
const Promise = require('bluebird');
const jsonfile = require('jsonfile');
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
let banks = [];
async function getBanks() {
  await Bank.find().distinct('_id', (error, doc) => {
    banks = doc;
  });
}
// Person generator
// Input: Number of person to generate

async function personGenerator(pNumber) {
    console.log('People are generating...');
    for (let i = 0; i < pNumber; i++) {
        let name = faker.name.findName();
        let joinDate = faker.date.past();

        const person = new Person({
            fullName: name,
            joinDate: joinDate,
        });
        await person.save();
    }
}
async function bankGenerator(bNumber) {
  for (let i = 0; i < bNumber; i++) {
    const location = faker.address.city();

    const bank = new Bank({
      location,
    });
    await bank.save((err) => {
      if (err) console.log(err);
    });
  }
}
async function accountGenerator() {
  await getBanks();

  await Person.find().distinct('_id', async (error, doc) => {
    for (let i = 0; i < 100000; i++) {
      const acc_number = 1 + Math.floor(Math.random() * 3);

      for (let j = 0; j <= acc_number; j++) {
        const IBAN = faker.finance.iban();
        const account = new Account({
          person_id: doc[i],
          IBAN,
          bank_id: banks[Math.floor(Math.random() * banks.length)],
        });
      await account.save();
      }
    }

  });
}
async function transactionGenerator() {
  await Account.find().distinct('_id',async (error, doc) => {

    for (let t = 0; t < 3000000; t++) {
      let senderId = Math.floor(Math.random() * doc.length);
      let receiverId = Math.floor(Math.random() * doc.length);
      while (senderId === receiverId) {
        senderId = Math.floor(Math.random() * doc.length);
        receiverId = Math.floor(Math.random() * doc.length);
      }

      const transaction = new Transaction({
        senderAccountId: doc[senderId],
        receiverAccountId: doc[receiverId],
      });

     await transaction.save();
    }

  });
}
let x;
async function personNodeGenerator() {
  await Person.find((err, doc) => {
    myWrite(doc, 'personNode.json');
  });
}
async function accountNodeGenerator() {
  await Account.find(async (err, doc) => {
    const person_account = [];
    const bank_account = [];
    await myWrite(doc, 'accountNode.json');

    for (let i = 0; i < doc.length; i++) {
      person_account.push({
        person_id: doc[i].person_id,
        account_id: doc[i]._id,
      });
    }
   await myWrite(person_account, 'personAccountEdge.json');

    for (let i = 0; i< doc.length; i++) {
        bank_account.push({
            account_id: doc[i]._id,
            bank_id: doc[i].bank_id
        })
    }
    await myWrite(bank_account, 'bankAccountEdge.json');


  });
}

async function bankNodeGenerator() {

    await Bank.find(async (err, doc) => {
        myWrite(doc,"bankNode.json");
    });


}

async function myWrite(_data, fileName) {
  _data = JSON.stringify(_data);
  await fs.appendFile(fileName, _data, (err) => {
    if (err) { /* Do whatever is appropriate if append fails */ }
  });
  console.log(`${fileName} created`);

}
async function transactionNodeGenerator() {
    let transaction_account = [];
    acc2acc = [];
    await Transaction.find(async (err, doc) => {
      await myWrite(doc,"transactionNode.json");

        for(let i = 0; i < doc.length; i++) {
            transaction_account.push({
                account_id: doc[i].senderAccountId,
                transaction_id: doc[i]._id
            });
            transaction_account.push({
                account_id: doc[i].receiverAccountId,
                transaction_id: doc[i]._id
            });
        }
        await myWrite(transaction_account,"transactionAccountEdge.json");
    });
}


async function graphGenerator() {

    await personNodeGenerator();

    await accountNodeGenerator();

    await bankNodeGenerator();

    console.log("Mission complete");
}


transactionNodeGenerator();