'use strict';

const {   
    GraphQLObjectType,
    GraphQLString
} = require('graphql')


const { appendLinePromise } = require('../lib/util');


const MutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addQuote: {
            type: GraphQLString,
            args: {
                body: { type: GraphQLString }
            },
            resolve: (_,args) => appendLinePromise('data/quotes.txt', args.body)
        }
    }
});


module.exports = { MutationType }