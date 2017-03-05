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
            type: GraphQLString,
            args: {
                upperCase: { type: GraphQLBoolean }
            },
            resolve: (obj, args) => {
                let fullName = `${obj.firstName} ${obj.lastName}`;
                return args.upperCase ? fullName.toUpperCase() : fullName;
            }
        },
        boss: { type: EmployeeType }
    })
});


module.exports = { EmployeeType };