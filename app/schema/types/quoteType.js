'use strict';

const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');


const QuoteType = new GraphQLObjectType({
    id: {},
    text: {},
    author: {}
});


module.exports = { QuoteType };