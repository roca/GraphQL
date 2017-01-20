const  { MongoClient }  = require('mongodb');
const assert = require('assert');
const { nodeEnv }  = require('../lib/util');
const mongoConfig = require('../config/mongo')[nodeEnv];

console.log('nodeEnv: ' + nodeEnv);

MongoClient.connect(mongoConfig.url, (err, db) => {
  assert.equal(null, err);

  db.collection('links').insertMany([
    { title: 'React.js Main Website', url: 'https://facebook.github.io/react' },
    { title: 'Relay Graphql Flux  Course Site', url: 'https://app.pluralsight.com/library/courses/react-apps-with-relay-graphql-flux/table-of-contents' },
    { title: 'graphql.org', url: 'http://graphql.org/' }
  ]).then(response => {
    console.log(response);
    db.close();
  });
});
