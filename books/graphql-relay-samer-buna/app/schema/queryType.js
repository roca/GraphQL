'use strict';

const {   
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const { QuoteType } = require('./types/quoteType');

const QueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        allQuotes: {
            type: new GraphQLList(QuoteType),
            description: 'A list of the quotes in the database',
            resolve: (_, args, { db }) => db.collection('quotes').find().toArray()
        },
        usersCount: {
            description: 'Total number of users in the database',
            type: GraphQLInt,
            resolve: (_, args, { db }) => db.collection("users").count()
        }
    }
});

 module.exports = { QueryType };


