const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const { fromSnakeCase } = require('../../lib/util');

module.exports = new GraphQLObjectType({
    name: 'meType',
    fields: {
        id: { type: GraphQLID},
        firstName: fromSnakeCase(GraphQLString),
        lastName: fromSnakeCase(GraphQLString),
        email: { type: new GraphQLNonNull(GraphQLString)},
        createdAt: fromSnakeCase(GraphQLString)
    }
})