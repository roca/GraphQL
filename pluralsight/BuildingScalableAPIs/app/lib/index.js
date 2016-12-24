const Env  = require('./util');
console.log(`Running in ${Env.nodeEnv} mode...`);


// Read the query from the command line arguments
const query = process.argv[2];

const ncSchema = require('../schema');
const { graphql } = require('graphql');

//Excute the query against the dfines server schema
graphql(ncSchema,query).then(result => {
  console.log(result);
});
