const  { MongoClient }  = require('mongodb');
const assert = require('assert');
const { nodeEnv }  = require('../lib/util');
const mongoConfig = require('../config/mongo')[nodeEnv];

console.log('nodeEnv: ' + nodeEnv);

MongoClient.connect(mongoConfig.url, (err, db) => {
  assert.equal(null, err);

  db.collection('users').insertMany([
    { firstName: 'John', lastName: 'Doe' , createdAt: Date.now()},
    { firstName: 'Jane', lastName: 'Doe' , createdAt: Date.now()}
  ]).then(response => {
    console.log(response);
    db.close();
  });

  db.collection('quotes').insertMany([
    { 
      text: "The best preparation for tomorrow is doing your best today",
      author: "H. Jackson Brown"
    },
    { 
      text: "If opportunity doesn't knock, build a door",
      author: "Milton Berl"
    },
    { 
      text: "Try to be a rainbow in someones's cloud",
      author: "Maya Angelou"
    }
  ]);
});
