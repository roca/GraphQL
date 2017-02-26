const  { MongoClient }  = require('mongodb');
const graphqlHTTP = require('express-graphql');
const express = require('express');

const { nodeEnv }  = require('./lib/util');
const mongoConfig = require('./config/mongo')[nodeEnv];
const Schema = require('./schema/main');

const app = express();

console.log('nodeEnv: ' + nodeEnv);

(async () => {

   let db = await MongoClient.connect(mongoConfig.url); 
   let schema = Schema(db);

   console.log('Connected to MongoDB server');

    app.use('/graphql', graphqlHTTP({
        schema
    }));

    app.listen(3000, () => console.log('Runninng Express.js on port 3000'));

})();