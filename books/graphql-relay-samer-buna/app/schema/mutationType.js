'use strict';

const { ObjectID } = require('mongodb');

const {   
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const {
    fromGlobalId,
    mutationWithClientMutationId
} = require('graphql-relay');


const { appendLinePromise } = require('../lib/util');
const { QuoteType } = require('./types/quoteType');


const thumbsUpMutation = mutationWithClientMutationId({
    name: 'ThumbsUpMutation',
    inputFields: {
        quoteId: {type: GraphQLString}
    },
    outputFields: {
        quote: {
            type: QuoteType,
            resolve: obj => obj
        }
    },
    mutateAndGetPayload: (params, { db }) => {
        const { id } = fromGlobalId(params.quoteId);
        return Promise.resolve(
            db.collection('quotes').updateOne(
                {_id: ObjectID(id)},
                { $inc: { likesCount: 1}}
            )
        ).then(result => db.collection('quotes').findOne(ObjectID(id)));
    }
});


const MutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        thumbsUp: thumbsUpMutation,
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