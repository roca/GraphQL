'use strict';

const {   
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLString
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

let connectionArgsWithSerach = connectionArgs;
connectionArgsWithSerach.searchTerm = { type: GraphQLString };

let QueryType = (db) => {
   const QuotesLibraryType = new GraphQLObjectType({
        name: 'QuotesLibrary',
        fields: {
            quotesConnection: {
                type: QuotesConnectionType,
                description: 'A list of the quotes in the database',
                args: connectionArgsWithSerach,
                resolve: (_, args) => {
                    let findParams = {};
                    if (args.searchTerm) {
                        findParams.text = new RegExp(args.searchTerm, 'i');
                    }
                    return connectionFromPromisedArray (
                                db.collection('quotes').find(findParams).toArray(), 
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


