
const { graphql } = require('graphql');
const readline = require('readline');
const  { MongoClient }  = require('mongodb');
const assert = require('assert');

const { nodeEnv }  = require('./lib/util');
const mongoConfig = require('./config/mongo')[nodeEnv];
const mySchema = require('./schema/main');

const graphqlHTTP = require('express-graphql');
const express = require('express');
const app = express();

console.log('nodeEnv: ' + nodeEnv);

const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

MongoClient.connect(mongoConfig.url, (err, db) => {
  assert.equal(null, err);

  console.log('Connected to MongoDB server')

    app.use('/graphql', graphqlHTTP({
        schema: mySchema,
        context: { db }
    }));

    app.listen(3000, () => console.log('Runninng Express.js on port 3000'));

});