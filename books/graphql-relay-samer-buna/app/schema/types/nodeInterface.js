'use strict';

const {
    fromGlobalId,
    nodeDefinitions,
    connectionFromPromisedArray
} = require('graphql-relay');

const { ObjectID } = require('mongodb');

const { QuotesLibraryType } = require('../queryType');

const  globalIdFetcher = async (globalId,{ db } ) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
        case 'QuotesLibrary':
            return { type: 'QuotesLibrary'};
        case 'Quote':
            return db.collection('quotes').findOne({_id: ObjectID(id)});
        default:
            return null;
    }
};

const globalTypeResolver = (obj) => obj.type || 'Quote';

const { nodeInterface, nodeField } = nodeDefinitions(
    globalIdFetcher,
    globalTypeResolver
);

module.exports = { nodeInterface, nodeField };


