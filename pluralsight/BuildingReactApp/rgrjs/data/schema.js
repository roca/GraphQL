import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'


import {
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray
} from "graphql-relay"

let Schema = (db) => {
    let store = {};

    let storeType = new GraphQLObjectType({
            name: 'Store',
            fields: () => {
                return {
                    linkConnection: {
                        type: linkConnection.connectionType,
                        args: connectionArgs,
                        resolve: (_, args) => connectionFromPromisedArray( db.collection("links").find({}).toArray(), args)
                    }
                };
            }
    });

    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => {
            return {
                id: { 
                    type: new GraphQLNonNull(GraphQLID),
                    resolve: (obj) => obj._id
                },
                title: { type: GraphQLString },
                url: { type: GraphQLString }
            };
        }
    });

    let linkConnection = connectionDefinitions({
        name: "Link",
        nodeType: linkType
    });

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => {
                return {
                    store: {
                        type: storeType,
                        resolve: () => store
                    }
                };
            }
        })
    });
    return schema;
}
export default Schema;