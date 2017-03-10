'use strict';

const {   
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} = require('graphql');


const { EmployeeType }  = require('./types/employeeType');
const { readLastLinePromise } = require('../lib/util');

const exampleEmployee = {
    firstName: 'jane',
    lastName: 'doe'
};


const roll = () => Math.floor(6 * Math.random()) + 1;

const QueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        lastQuote: {
            type: GraphQLString,
            resolve: () => readLastLinePromise('data/quotes.txt')
        },
        exampleEmployee: {
            type: EmployeeType,
            resolve: () => {
                return exampleEmployee;
            }
        },
        hello: {
            type: GraphQLString,
            resolve: () => 'world'
        },
        diceRoll: {
            description: '***Simulate*** a dice roll determined by count',
            type: new GraphQLList(GraphQLInt),
            args: {
                count: {type: GraphQLInt}
            },
            resolve: (_, args) => {
                let rolls = [];
                for (let i = 0; i < args.count; i++) {
                    rolls.push(roll());
                }
                return rolls;
            }
        },
        usersCount: {
            description: 'Total number of users in the database',
            type: GraphQLInt,
            resolve: (_, args) => db.collection("users").count()
        }
    }
});


 module.exports = { QueryType };


