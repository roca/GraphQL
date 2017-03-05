'use strict';

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} = require('graphql');


const  { EmployeeType }  = require('./types/employeeType');

const exampleEmployee = {
    firstName: 'jane',
    lastName: 'doe'
};

let Schema = (db) => {

    const roll = () => Math.floor(6 * Math.random()) + 1;

    const queryType = new GraphQLObjectType({
        name: 'RootQuery',
        fields: {
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

    const schema = new GraphQLSchema({
        query: queryType
    });

    return schema;
}

module.exports = Schema;