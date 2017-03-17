'use strict';

const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

let QuoteType = (db) => {
    const quoteType = new GraphQLObjectType({
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
    return quoteType;
};


module.exports = { QuoteType };