'use strict';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean
} = require('graphql');


const EmployeeType = new GraphQLObjectType({
    name: 'EmployeeType',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        boss: { type: GraphQLString }
    })
});


module.exports = EmployeeType;