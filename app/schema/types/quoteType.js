'use strict';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const {
    globalIdField
} = require('graphql-relay');

const { nodeInterface } = require('./nodeInterface');

const QuoteType = new GraphQLObjectType({
    name: 'Quote',
    interfaces: [nodeInterface],
    fields: {
        id: globalIdField('Quote', obj => obj._id),
        text: { type: GraphQLString },
        author: { type: GraphQLString },
        likesCount: {
            type: GraphQLInt,
            resolve: () => Math.floor(10 * Math.random())
        }
    }
});

module.exports = { QuoteType };