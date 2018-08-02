const faker = require('faker');

function generateCost(amount, rate, min, max) {
  const predict = ((amount * rate).toFixed(2));
  if (predict < min) {
    return (min.toFixed(2));
  }
  if (predict > max) {
    return (max.toFixed(2));
  }
  return predict;
}

// Transfer selector methods
function localTransferSelector() { // amount, cost, type, date, commission:
  const amount = (Number)(faker.finance.amount());
  const year = Math.floor(Math.random() * 28) + 1990;
  const month = Math.floor(Math.random() * 12);
  const opDate = new Date(year, month);
  const sube = [
    {
      amount,
      cost: (34.00.toFixed(2)),
      type: 'Şube Havale - Hesaptan hesaba',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: generateCost(amount, 0.005, 45, 520),
      type: 'Şube Havale - Hesaptan İsme',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: generateCost(amount, 0.005, 45, 520),
      type: 'Şube Havale - Kasadan Hesaba',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: generateCost(amount, 0.005, 60, 520),
      type: 'Şube Havale - Kasadan İsme',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (34.00.toFixed(2)),
      type: 'Şube Havale - Düzenli Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: generateCost(amount, 0.005, 45, 520),
      type: 'Şube Havale - Hesaptan İsime',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (17.00.toFixed(2)),
      type: 'Şube Havale - Hesaptan Hesaba',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (17.00.toFixed(2)),
      type: 'Şube Havale - Kasadan Hesaba',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: generateCost(amount, 0.001, 11, 556), // MOCK
      type: 'Şube Havale - Western Union',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
  ];
  const bankamatik = [
    {
      amount,
      cost: (9.00.toFixed(2)),
      type: 'Banakamatik Havale - Kartlı Cebe Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (9.00.toFixed(2)),
      type: 'Banakamatik Havale - Hesaptan Hesaba Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (9.00.toFixed(2)),
      type: 'Banakamatik Havale - Hesaba Kartlı Para Yatırma',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (9.00.toFixed(2)),
      type: 'Banakamatik Havale - Hesaba Kartsız Para Yatırma',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (12.00.toFixed(2)),
      type: 'Banakamatik Havale - TCKN ile Hesaba Kartsız Para Yatırma',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (15.00.toFixed(2)),
      type: 'Bankamatik Havale - Hesaba Kartsız Para Yatırma / TCKN İle (Rutin işlem saati veya iş günü dışında gerçekleştirilen işlemler)',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (15.00.toFixed(2)),
      type: 'Bankamatik Havale - TC/KKTC Şubeleri Arası Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (10.00.toFixed(2)),
      type: 'Bankamatik Havale - KKTC Şubeleri Arası Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: generateCost(amount, 0.001, 11, 556),
      type: 'Bankamatik Havale - Western Union Para Transferi (TL)',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
  ];
  const internetSube = [
    {
      amount,
      cost: (2.20.toFixed(2)),
      type: 'İnternet Şubesi Havale - Hesaptan Hesaba Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (2.20.toFixed(2)),
      type: 'İnternet Şubesi Havale - Hesaptan İsme Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (6.00.toFixed(2)),
      type: 'İnternet Şubesi Havale - Hesaptan Cebe Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (2.20.toFixed(2)),
      type: 'İnternet Şubesi Havale - Hesaptan Düzenli Havale Talimatı Verilmesi',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (2.20.toFixed(2)),
      type: 'İnternet Şubesi Havale - Hesaptan Düzenli Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (8.50.toFixed(2)),
      type: 'İnternet Şubesi Havale - TC/KKTC Şubeleri Arası Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (5.00.toFixed(2)),
      type: 'İnternet Şubesi Havale - KKTC Şubeleri Arası Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (10.00.toFixed(2)),
      type: 'İnternet Şubesi Havale - KKTC\'den Yapılan Cebe Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: generateCost(amount, 0.001, 11, 556), // MOCK
      type: 'İnternet Şubesi Havale - Western Union',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
  ];
  const telefonSubesi = [
    {
      amount,
      cost: (5.00.toFixed(2)),
      type: 'Telefon Şubesi Havale - Hesaptan Hesaba Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (8.00.toFixed(2)),
      type: 'Telefon Şubesi Havale - TC/KKTC Şubeleri Arası Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (7.00.toFixed(2)),
      type: 'Telefon Şubesi Havale - KKTC Şubeleri Arası Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
  ];
  const isCep = [
    {
      amount,
      cost: (2.20.toFixed(2)),
      type: 'İşCep Havale - Hesaptan Hesaba Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (6.00.toFixed(2)),
      type: 'İşCep Havale - Hesaptan Cebe Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (2.20.toFixed(2)),
      type: 'İşCep Havale - Hesaptan Düzenli Havale Talimatı Verilmesi',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (2.20.toFixed(2)),
      type: 'İşCep Havale - Hesaptan Düzenli Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (8.50.toFixed(2)),
      type: 'İşCep Havale - TC/KKTC Şubeleri Arası Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (8.50.toFixed(2)),
      type: 'İşCep Havale - TC/KKTC Şubeleri Arası Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (10.00.toFixed(2)),
      type: 'İşCep Havale - KKTC\'den Yapılan Cebe Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (5.00.toFixed(2)),
      type: 'İşCep Havale - KKTC Şubeleri Arası Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: generateCost(amount, 0.001, 11, 556), // MOCK
      type: 'İşCep Havale - Western Union',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
  ];
  const cagriMerkezi = [
    {
      amount,
      cost: (40.00.toFixed(2)),
      type: 'Çağrı Merkezi Havale - Hesaptan Hesaba Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (34.00.toFixed(2)),
      type: 'Çağrı Merkezi Havale - Hesaptan Düzenli Havale Talimatı Verilmesi',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: (3.40.toFixed(2)),
      type: 'Çağrı Merkezi Havale - Hesaptan Düzenli Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: generateCost(amount, 0.002, 40, 615),
      type: 'Çağrı Merkezi Havale - TC/KKTC Şubeleri Arası=Düzenli Havale Talimatı Verilmesi',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
    {
      amount,
      cost: generateCost(amount, 0.002, 15, 615),
      type: 'Çağrı Merkezi Havale - TC/KKTC Şubeleri Arası Havale=Düzenli Havale',
      date: opDate,
      commission: (Number)((amount * 0.001).toFixed(2)),
    },
  ];
  const arr = [sube, bankamatik, telefonSubesi, internetSube, isCep, cagriMerkezi];
  const category = arr[Math.floor(Math.random() * arr.length)];
  return category[Math.floor(Math.random() * category.length)];
}

function foreignTransferSelector() {
  const amount = (Number)(faker.finance.amount());
  const year = Math.floor(Math.random() * 28) + 1990;
  const month = Math.floor(Math.random() * 12);
  const opDate = new Date(year, month);

  const sube = [
    {
      amount,
      cost: generateCost(amount, 0.001, 26, 375),
      type: 'Şube Havale - Hesaptan Hesaba Havale / Altın /Altın',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'Gram Altın',
      costCode: 'TRY',
    },
    {
      amount,
      cost: generateCost(amount, 0.01, 3, 337.5),
      type: 'Şube Havale - Western Union Para Transferi (USD)',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'USD',
      costCode: 'USD',
    },
    {
      amount,
      cost: generateCost(amount, 0.01, 10, 220),
      type: 'Şube Havale - Western Union Para Transferi (EUR)',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'EUR',
      costCode: 'EUR',
    },
  ];
  const bankamatik = [
    {
      amount,
      cost: generateCost(amount, 0.01, 3, 337.5),
      type: 'Bankamatik Havale - Western Union Para Transferi (USD)',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'USD',
      costCode: 'USD',
    },
    {
      amount,
      cost: generateCost(amount, 0.01, 10, 220),
      type: 'Bankamatik Havale - WWestern Union Para Transferi (EUR)',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'EUR',
      costCode: 'EUR',
    },
  ];
  const internetSube = [
    {
      amount,
      cost: (0.02.toFixed(2)),
      type: 'İnternet Şubesi Havale - Hesaptan Hesaba Havale / Altın/Altın',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'Gram Altın',
      costCode: 'TRY',
    },
    {
      amount,
      cost: (0.02.toFixed(2)),
      type: 'İnternet Şubesi Havale - Hesaptan Hesaba Havale / Altın/Altın',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'Gram Altın',
      costCode: 'TRY',
    },
    {
      amount,
      cost: generateCost(amount, 0.01, 3, 337.5),
      type: 'İnternet Şubesi Havale - Western Union Para Transferi (USD)',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'USD',
      costCode: 'USD',
    },
    {
      amount,
      cost: generateCost(amount, 0.01, 3, 337.5),
      type: 'İnternet Şubesi Havale - Western Union Para Transferi (USD)',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'USD',
      costCode: 'USD',
    },
    {
      amount,
      cost: generateCost(amount, 0.01, 10, 220),
      type: 'İnternet Şubesi Havale - Western Union Para Transferi (USD)',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'EUR',
      costCode: 'EUR',
    },
  ];
  const isCep = [
    {
      amount,
      cost: generateCost(amount, 0.01, 3, 337.5),
      type: 'İşCep Şubesi Havale - Western Union Para Transferi (USD)',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'USD',
      costCode: 'USD',
    },
    {
      amount,
      cost: generateCost(amount, 0.01, 10, 220),
      type: 'İşCep Havale - Western Union Para Transferi (USD)',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'EUR',
      costCode: 'EUR',
    },
  ];
  const cagriMerkezi = [
    {
      amount,
      cost: (0.05.toFixed(2)),
      type: 'İşCep Havale - Western Union Para Transferi (USD)',
      date: opDate,
      commission: (Number)((amount * 0.002).toFixed(2)),
      currCode: 'Gram Altın',
      costCode: 'Gram Altın',
    },
  ];
  const arr = [sube, bankamatik, internetSube, isCep, cagriMerkezi];
  const category = arr[Math.floor(Math.random() * arr.length)];
  return category[Math.floor(Math.random() * category.length)];
}

// EFT selector methods


// Selecting the transfer
function selectTransfer() {
  const pref = Math.floor(Math.random() * 2);
  let obj = {};
  if (pref === 0) {
    obj = localTransferSelector();
    obj.id = 'local';
  } else {
    obj = foreignTransferSelector();
    obj.id = 'foreign';
  }
  return obj;
}

// Selecting the EFT
function selectEFT() {
  const amount = (Number)(faker.finance.amount());
  const year = Math.floor(Math.random() * 28) + 1990;
  const month = Math.floor(Math.random() * 12);
  const opDate = new Date(year, month);
  const eft = [
    {
      amount,
      cost: generateCost(amount, 0.005, 55, 525),
      date: opDate,
    },
    {
      amount,
      cost: generateCost(amount, 0.005, 59, 525),
      date: opDate,
    },
    {
      amount,
      cost: (9.00.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: generateCost(amount, 0.005, 56, 525),
      date: opDate,
    },
    {
      amount,
      cost: (12.00.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: (15.00.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: (20.00.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: (5.10.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: (9.90.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: (6.00.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: (5.10.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: (7.40.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: (9.90.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: (55.00.toFixed(2)),
      date: opDate,
    },
    {
      amount,
      cost: (9.00.toFixed(2)),
      date: opDate,
    },
  ];
  return eft[Math.floor(Math.random() * eft.length)];
}

module.exports = { selectTransfer, selectEFT };
