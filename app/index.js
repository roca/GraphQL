const fs = require('fs');
const path = require('path');
const  { MongoClient }  = require('mongodb');
// const assert = require('assert');
const graphqlHTTP = require('express-graphql');
const { graphql } = require('graphql');
const express = require('express');
const { introspectionQuery } = require('graphql/utilities')

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
   console.log('Connected to MongoDB server');

   let schema = Schema(db);

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }));


    graphql(schema, introspectionQuery)
    .then(result => {
        fs.writeFile(
            path.join(__dirname, 'cache/schema.json'),
            JSON.stringify(result, null, 2)
        );
        console.log('Generated cached schema.json file');
    })
    .catch(console.error);

    app.listen(3000, () => console.log('Runninng Express.js on port 3000'));

})();
 
