'use strict';

const {   
    GraphQLObjectType,
    GraphQLInt
} = require('graphql');

const QueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        usersCount: {
            description: 'Total number of users in the database',
            type: GraphQLInt,
            resolve: (_, args, { db }) => db.collection("users").count()
        }
    }
});

 module.exports = { QueryType };


