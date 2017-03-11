'use strict';

const {
    GraphQLSchema
} = require('graphql');

const { QueryType } = require('./queryType');
const { MutationType } = require('./mutationType');

let Schema = () => {

    const schema = new GraphQLSchema({
        query: QueryType,
        mutation: MutationType
    });

    return schema;
}

module.exports = Schema;