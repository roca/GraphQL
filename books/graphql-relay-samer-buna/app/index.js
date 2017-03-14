const  { MongoClient }  = require('mongodb');
// const assert = require('assert');
const graphqlHTTP = require('express-graphql');
const express = require('express');

const app = express();
app.use(express.static('public'));

const Schema = require('./schema/main');
const { nodeEnv }  = require('./lib/util');
const mongoConfig = require('./config/mongo')[nodeEnv];

console.log('nodeEnv: ' + nodeEnv);

// MongoClient.connect(mongoConfig.url, (err, db) => {
//    assert.equal(null, err);
//    console.log('Connected to MongoDB server');

//    let schema = Schema();

//     app.use('/graphql', graphqlHTTP({
//         schema,
//         context: { db },
//         graphiql: true
//     }));

//     app.listen(3000, () => console.log('Runninng Express.js on port 3000'));

// }); 

(async () => {

   let db = await MongoClient.connect(mongoConfig.url); 
   let schema = Schema(db);

   console.log('Connected to MongoDB server');

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }));

    app.listen(3000, () => console.log('Runninng Express.js on port 3000'));

})();
 
