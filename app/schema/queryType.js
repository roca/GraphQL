'use strict';

const {   
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const {
    connectionDefinitions,
    connectionArgs,
    connectionFromArray,
    connectionFromPromisedArray
} = require('graphql-relay');

const { QuoteType } = require('./types/quoteType');

const { connectionType: QuotesConnectionType } = 
    connectionDefinitions({
        name: 'Quote',
        nodeType: QuoteType
    });

let QueryType = (db) => {
   const QuotesLibraryType = new GraphQLObjectType({
        name: 'QuotesLibrary',
        fields: {
            quotesConnection: {
                type: QuotesConnectionType,
                description: 'A list of the quotes in the database',
                args: connectionArgs,
                resolve: (_, args) => {
                    return connectionFromPromisedArray (
                                db.collection('quotes').find().toArray(), 
                                args
                           );
                }
            }
        }
    });

    const quotesLibrary = {};

    const queryType = new GraphQLObjectType({
        name: 'RootQuery',
        fields: {
            QuotesLibrary: {
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


