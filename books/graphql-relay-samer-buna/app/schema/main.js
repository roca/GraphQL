'use strict';

const {
    GraphQLSchema
} = require('graphql');

const { QueryType } = require('./queryType');
const { MutationType } = require('./mutationType');


const Schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

module.exports = Schema;