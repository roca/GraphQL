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
});
