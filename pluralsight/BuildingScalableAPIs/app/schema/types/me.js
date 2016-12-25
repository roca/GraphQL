const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'meType',
    fields: {
        id: { type: GraphQLID},
        email: { type: new GraphQLNonNull(GraphQLString)}
    }
})