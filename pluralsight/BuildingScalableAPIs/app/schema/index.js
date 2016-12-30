const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const UserType = require('./types/user');

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        me: {
            type: UserType,
            description: 'The current user identified by an api key',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (obj, args, { loaders }) => {
                // Read user information from database
                // using args.key as the api key
                // using pgPool...
                return loaders.usersByApiKeys.load(args.key);
                //return pgdb(pgPool).getUserByApiKey(args.key);
            }
        }
    }
})

const ncSchema = new GraphQLSchema({
    query: RootQueryType
    // mutation ...
})

module.exports = ncSchema;