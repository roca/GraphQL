import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql'

let Schema = (db) => {
    let store = {};

    let storeType = new GraphQLObjectType({
            name: 'Store',
            fields: () => {
                return {
                    links: {
                        type: new GraphQLList(linkType),
                        resolve: () => db.collection("links").find({}).toArray()
                    }
                };
            }
    });

    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => {
            return {
                _id: { type: GraphQLString },
                title: { type: GraphQLString },
                url: { type: GraphQLString }
            };
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
        })
    });
    return schema;
}
export default Schema;