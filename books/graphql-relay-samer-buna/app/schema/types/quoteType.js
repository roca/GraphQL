'use strict';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const QuoteType = new GraphQLObjectType({
    name: 'Quote',
    fields: {
        id: {
            type: GraphQLString,
            resolve: obj => obj._id
        },
        text: { type: GraphQLString },
        author: { type: GraphQLString },
        likeCount: {
            type: GraphQLInt,
            resolve: () => Math.floor(10 * Math.random())
        }
    }
});


module.exports = { QuoteType };