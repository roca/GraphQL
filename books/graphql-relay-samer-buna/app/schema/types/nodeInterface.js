'use strict';

const {
    fromGlobalId,
    nodeDefinitions,
    connectionFromPromisedArray
} = require('graphql-relay');

const { ObjectID } = require('mongodb');

const { QuotesLibraryType } = require('../queryType');
const { QuoteType } = require('./quoteType');

const quotesLibrary = { type: QuotesLibraryType};

const  globalIdFetcher = (globalId,{ db } ) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
        case 'QuotesLibrary':
            return quotesLibrary;
        case 'Quote':
            console.log(id);
            var quote = db.collection('quotes').findOne(ObjectID(id))
            console.log(quote);
            return quote
        default:
            return null;
    }
};

const globalTypeResolver = obj => obj.type || QuoteType;

const { nodeInterface, nodeField } = nodeDefinitions(
    globalIdFetcher,
    globalTypeResolver
);

module.exports = { nodeInterface, nodeField };


