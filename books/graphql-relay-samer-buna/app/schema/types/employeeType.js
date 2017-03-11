'use strict';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean
} = require('graphql');

const { LetterCaseType, toTitleCase } = require('./letterCaseType');

const EmployeeType = new GraphQLObjectType({
    name: 'EmployeeType',
    fields: () => ({
        name: {
            type: GraphQLString,
            deprecationReason: "Use nameForCase instead",
            args: {
                upperCase: { type: GraphQLBoolean }
            },
            resolve: (obj, args) => {
                let fullName = `${obj.firstName} ${obj.lastName}`;
                return args.upperCase ? fullName.toUpperCase() : fullName;
            }
        },
        nameForCase: {
            type: GraphQLString,
            args: {
                letterCase: { type: LetterCaseType }
            },
            resolve: (obj, args) => {
                let fullName = `${obj.firstName} ${obj.lastName}`;
                switch (args.letterCase) {
                    case 'lower':
                        return fullName.toLowerCase();
                    case 'upper':
                        return fullName.toUpperCase();
                    case 'title':
                        return toTitleCase(fullName);
                    default:
                        return fullName;
                }             
            }
        },
        boss: { type: EmployeeType }
    })
});


module.exports = { EmployeeType };