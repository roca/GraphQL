const fs = require('fs');
const path = require('path');
const { graphql } = require('graphql');
const { introspectionQuery } = require('graphql/utilities')
const Schema = require('./schema/main');


graphql(Schema, introspectionQuery)
.then(result => {
    fs.writeFileSync(
        path.join(__dirname, 'cache/schema.json'),
        JSON.stringify(result, null, 2)
    );
    console.log('Generated cached schema.json file');
})
.catch(console.error);

