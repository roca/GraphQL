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
    globalIdField,
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray,
    mutationWithClientMutationId
} from "graphql-relay"

let Schema = (db) => {
    let store = {};

    let storeType = new GraphQLObjectType({
            name: 'Store',
            fields: () => {
                return {
                    id: globalIdField("Store"),
                    linkConnection: {
                        type: linkConnection.connectionType,
                        args: connectionArgs,
                        resolve: (_, args) => connectionFromPromisedArray( 
                            db.collection("links").find({})
                            .sort({createdAt: -1})
                            .limit(args.first).toArray(),
                             args
                         )
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
                url: { type: GraphQLString },
                createdAt: {
                    type: GraphQLString,
                    resolve: (obj) => new Date(obj.createdAt).toISOString()
                }
            };
        }
    });

    let linkConnection = connectionDefinitions({
        name: "Link",
        nodeType: linkType
    });

    let createLinkMutation = mutationWithClientMutationId({
        name: 'CreateLink',

        inputFields: {
            title: { type: new GraphQLNonNull(GraphQLString) },
            url: { type: new GraphQLNonNull(GraphQLString) }
        },

        outputFields: {
            linkEdge: {
                type: linkConnection.edgeType,
                resolve: (obj) => {
                    return { node: obj.ops[0], cursor: obj.insertId}
                }
            },
            store: {
                type: storeType,
                resolve: () => store
            }
        },

        mutateAndGetPayload: ({title,url}) => {
            return db.collection("links").insertOne({
                title,
                url,
                createdAt: Date.now()
            });
        }
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
        }),

        mutation: new GraphQLObjectType({
            name: "Mutation",
            fields: () => {
                return {
                    createLink: createLinkMutation
                };
            }
        })
    });
    return schema;
}
export default Schema;