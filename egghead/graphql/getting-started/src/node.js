'use strict';

const { 
    nodeDefinitions,
    fromGlobalId
} = require('graphql-relay');

const { getObjectById } = require('./data');

const { nodeInterface , nodeField } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);
         return getObjectById(type.toLocaleLowerCase(), id);
    },
    (object) => {
        const { VideoType } = require('../');
        return object.title ? VideoType : null;
    }
);

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;