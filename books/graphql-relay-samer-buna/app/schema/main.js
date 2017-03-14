'use strict';

const {
    GraphQLSchema
} = require('graphql');

const { QueryType } = require('./queryType');
const { MutationType } = require('./mutationType');

let Schema = (db) => {

    const schema = new GraphQLSchema({
        query: QueryType(db),
        mutation: MutationType
    });

    return schema;
}

module.exports = Schema;