const mongoose = require('mongoose');
const faker = require('faker');

faker.locale = 'tr';
const Promise = require('bluebird');
const dbConfig = require('./config/dbconfig');
const Bank = require('./models/bank');
const Person = require('./models/person');
const Account = require('./models/account');
const Transaction = require('./models/transaction');

let bankCount = 0;
let personCount = 0;
let accountCount = 0;
let transactionCount = 0;
const trnsctPromises = [];


/**
 * Generates a random number in the given range
 * @param min - Minimum value that the random number may take
 * @param max - Maximum value that the random number may take
 * @returns {Number}
 */
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Finds a random element from the collection and resolves it
 * @param model - The type of the desired element
 * @param modelCount - The
 * @returns {Promise}
 */
function loadRandomDbElement(model, modelCount) {
  return new Promise((resolve, reject) => {
    const r = getRandomInteger(0, modelCount);
    model.findOne().skip(r)
      .then((result) => {
        resolve(result._id);
      })
      .catch(err => reject(new Error(`Hata ${model}${err}`)));
  });
}

// BANK GENERATION
/**
 * Generates a single bank instance and saves it to Mongo DB server (admin)
 * @retruns {Promise} Returns a promise that shows the instance is successfully saved
 */
function createBank() {
  return new Promise((resolve, reject) => {
    const bank = new Bank({
      bankname: faker.company.companyName(),
      location: faker.address.city(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
    });
    bank.save()
      .then(() => {
        bankCount += 1;
        console.log(`BANK: ${bankCount}`);
        resolve(true);
      })
      .catch((err) => {
        reject(new Error(`Error at saving bank: + ${err}`));
      });
  });
}

/**
 * Async function to save desired amount of banks to Mongo DB server (admin)
 * @param bankGenerateCount
 * @returns {Promise}
 */
async function createBankData(bankGenerateCount) {
  const bankPromises = [];
  try {
    for (let i = 0; i < bankGenerateCount; i += 1) {
      const bankPromise = createBank();
      bankPromises.push(bankPromise);
    }
    await Promise.all(bankPromises);
    console.log('END OF GENERATING BANKS');
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(`Error at generating multiple banks: ${error}`));
  }
}

// PERSON GENERATION
function createPerson() {
  return new Promise((resolve, reject) => {
    const person = new Person({
      customername: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      createdAt: faker.date.past(),
    });
    person.save()
      .then(() => {
        personCount += 1;
        console.log(`PERSON: ${personCount}`);
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(`Error at saving person: ${error}`));
      });
  });
}

async function createPersonData(personGenerateCount) {
  const personPromises = [];
  try {
    for (let i = 0; i < personGenerateCount; i += 1) {
      const personPromise = createPerson();
      personPromises.push(personPromise);
    }
    await Promise.all(personPromises);
    console.log('END OF GENERATING PEOPLE');
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(`Error at generating multiple people: ${error}`));
  }
}

// ACCOUNT GENERATION
function createAccount(bankId, personId) {
  return new Promise((resolve, reject) => {
    const account = new Account({
      owner: personId,
      bank: bankId,
      balance: (Math.random() * 1000000).toFixed(2),
    });
    account.save()
      .then(() => {
        accountCount += 1;
        console.log(`ACCOUNT: ${accountCount}`);
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(`Error at saving account: ${error}`));
      });
  });
}

async function createAccountData(particularCount, bankId, personId) {
  const accountPromises = [];
  try {
    for (let i = 0; i < particularCount; i += 1) {
      const accPromise = createAccount(bankId, personId);
      accountPromises.push(accPromise);
    }
    await Promise.all(accountPromises);
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(`Error in generating particular accounts: ${error}`));
  }
}

async function semiDriverAccountGenerator(personGenerateCount, bankGenerateCount) {
  try {
    const bankId = await loadRandomDbElement(Bank, bankGenerateCount);
    const personId = await loadRandomDbElement(Person, personGenerateCount);
    await createAccountData(getRandomInteger(1, 4), bankId, personId);
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error('Error at retrieving data to generate account'));
  }
}

async function generateAccounts(count, personGenerateCount, bankGenerateCount) {
  const completePromises = [];
  try {
    for (let i = 0; i < count; i += 1) {
      const accComplete = semiDriverAccountGenerator(personGenerateCount, bankGenerateCount);
      completePromises.push(accComplete);
    }
    await Promise.all(completePromises);
    console.log('END OF GENERATING ACCOUNTS');
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error('Error when saving accounts'));
  }
}

// GENERATE TRANSACTIONS
function createTransaction(senderId, receiverId) {
  return new Promise((resolve, reject) => {
    const transaction = new Transaction({
      sender: senderId,
      receiver: receiverId,
      amount: faker.finance.amount(),
    });
    transaction.save()
      .then(() => {
        transactionCount += 1;
        console.log(`TRANSACTION: ${transactionCount}`);
        resolve(true);
      })
      .catch((error) => {
        reject(new Error(`Error at saving transactions: ${error}`));
      });
  });
}

async function createTransactionData(particularCount, senderId, receiverId) {
  const transactionPromises = [];
  try {
    for (let i = 0; i < particularCount; i += 1) {
      const transactionPromise = createTransaction(senderId, receiverId);
      transactionPromises.push(transactionPromise);
    }
    await Promise.all(transactionPromises);
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(new Error(`Error at saving multiple transactions: ${error}`));
  }
}

async function semiDriverTransactionGenerator() {
  try {
    const senderAccount = await loadRandomDbElement(Account, accountCount);
    const receiverAccount = await loadRandomDbElement(Account, accountCount);
    await createTransactionData(getRandomInteger(1, 10), senderAccount, receiverAccount);
    return Promise.resolve(true);
  } catch (error) {
    throw (new Error('Error at retrieving data to generate Transaction'));
  }
}

async function generateTransactions(count) {
  try {
    for (let i = 0; i < count; i += 1) {
      const trnsctPromise = semiDriverTransactionGenerator();
      trnsctPromises.push(trnsctPromise);
    }
    await Promise.all(trnsctPromises);
    // console.log('END OF GENERATING TRANSACTIONS');
    return Promise.resolve(true);
  } catch (error) {
    // console.log('error when saving transactions');
    return Promise.reject(new Error('Error at saving transactions'));
  }
}

async function driver(bankGenerateCount, personGenerateCount) {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(dbConfig.url);
    console.log('Successfully connected to the database');
    await createBankData(bankGenerateCount);
    await createPersonData(personGenerateCount);

    await generateAccounts(10000, personGenerateCount, bankGenerateCount);
    await generateAccounts(10000, personGenerateCount, bankGenerateCount);
    await generateAccounts(10000, personGenerateCount, bankGenerateCount);
    await generateAccounts(10000, personGenerateCount, bankGenerateCount);
    await generateAccounts(10000, personGenerateCount, bankGenerateCount);

    await generateTransactions(5000);
    await generateTransactions(5000);
    await generateTransactions(5000);
    await generateTransactions(5000);
    await generateTransactions(5000);
    await generateTransactions(5000);
    await generateTransactions(5000);
    await generateTransactions(5000);
    await generateTransactions(5000);
    await generateTransactions(5000);
    return Promise.resolve(true);
  } catch (error) {
    // console.log('ERROR');
    return Promise.reject(new Error('Error at driver function'));
  }
}

driver(50, 50000)
  .then(() => {
    console.log('END');
  })
  .catch((err) => {
    throw new Error(`Error at last ${err}`);
  });
