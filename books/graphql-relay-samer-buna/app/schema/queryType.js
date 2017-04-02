'use strict';

const {   
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const {
    globalIdField,
    connectionDefinitions,
    connectionArgs,
    connectionFromArray,
    connectionFromPromisedArray
} = require('graphql-relay');

const { QuoteType } = require('./types/quoteType');
const { nodeInterface, nodeField } = require('./types/nodeInterface');


const { connectionType: QuotesConnectionType } = 
    connectionDefinitions({
        name: 'Quote',
        nodeType: QuoteType
    });

let connectionArgsWithSerach = connectionArgs;
connectionArgsWithSerach.searchTerm = { type: GraphQLString };


const QuotesLibraryType = new GraphQLObjectType({
    name: 'QuotesLibrary',
    interfaces: [nodeInterface],
    fields: {
        id: globalIdField('QuotesLibrary'),
        quotesConnection: {
            type: QuotesConnectionType,
            description: 'A list of the quotes in the database',
            args: connectionArgsWithSerach,
            resolve: (_, args, { db }) => {
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

const QueryType = new GraphQLObjectType({

    name: 'RootQuery',
    fields: {
        node: nodeField,
        QuotesLibrary: {
            type: QuotesLibraryType,
            description: 'The Quotes Library',
            resolve: (_, args) => quotesLibrary
        },
        usersCount: {
            description: 'Total number of users in the database',
            type: GraphQLInt,
            resolve: (_, args, { db }) => db.collection("users").count()
        }
    }
});


 module.exports = { QueryType, QuotesLibraryType };


