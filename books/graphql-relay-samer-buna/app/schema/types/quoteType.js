'use strict';

const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const QuoteType = new GraphQLObjectType({
    name: 'Quote',
    fields: {
        id: {
            type: GraphQLString,
            resolve: obj => obj._id
        },
        text: { type: GraphQLString },
        author: { type: GraphQLString }
    }
});


module.exports = { QuoteType };