'use strict';

const {   
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const { QuoteType } = require('./types/quoteType');

let QueryType = (db) => {

    const QuotesLibraryType = new GraphQLObjectType({
        name: 'QuotesLibrary',
        fields: {
            allQuotes: {
                type: new GraphQLList(QuoteType),
                description: 'A list of the quotes in the database',
                resolve: (_, args) => db.collection('quotes').find().toArray()
            }
        }
    });

    const quotesLibrary = {};

    const queryType = new GraphQLObjectType({
        name: 'RootQuery',
        fields: {
            allQuotes: {
                type: QuotesLibraryType,
                description: 'The Quotes Library',
                resolve: (_, args) => quotesLibrary
            },
            usersCount: {
                description: 'Total number of users in the database',
                type: GraphQLInt,
                resolve: (_, args) => db.collection("users").count()
            }
        }
    });

    return queryType;
};

 module.exports = { QueryType };


