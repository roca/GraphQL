'use strict';

const express = require('express');

const graphqlHTTP = require('express-graphql');

const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');

const { 
    globalIdField,
    connectionDefinitions,
    connectionFromPromisedArray,
    connectionArgs,
    mutationWithClientMutationId
} = require('graphql-relay');

const { getVideoById, getVideos, createVideo } = require('./src/data');
const { nodeInterface, nodeField } = require('./src/node');

const PORT = process.env.PORT || 3000;

const server = express();

const VideoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video on EggHead.io',
    fields: {
        id: new globalIdField(),
        title: { type: GraphQLString, description: 'The title of the video.' },
        duration: { type: GraphQLInt, description: 'The duration of the video (in seconds).'  },
        watched: { type: GraphQLBoolean, description: 'Whether or not the viewer has watched the video'  }
    },
    interfaces: [nodeInterface]
});

exports.VideoType = VideoType;

const { connectionType: VideoConnection } = connectionDefinitions({
    nodeType: VideoType,
    connectionFields: {
         totalCount: {
            type: GraphQLInt,
            description: 'A count of the total number of objects in this connectiom.',
            resolve: (conn) => conn.edges.length
         }
         
    }

});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        node: nodeField,
        videos: {
            type: VideoConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromPromisedArray(getVideos(), args)
        },
        video: { 
            type: VideoType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID), description: 'The id of the video.'  }
            },
            resolve: (_, args) => getVideoById(args.id)
        }
    }
});

const videoMutation = new mutationWithClientMutationId({
    name: 'AddVideo',
    inputFields: {
        title: { type: new GraphQLNonNull(GraphQLString), description: 'The title of the video.' },
        duration: { type: new GraphQLNonNull(GraphQLInt), description: 'The duration of the video (in seconds).'  },
        released: { type: new GraphQLNonNull(GraphQLBoolean), description: 'Whether or not the is released.'  }
    },
    outputFields: {
        video: {type: VideoType}
    },
    mutateAndGetPayload: (args) => new Promise((resolve, reject) => {
        Promise.resolve(createVideo(args))
        .then((video) => resolve({ video }))
        .catch(reject);
    })
});

const mutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'The root mutation type.',
    fields: {
        createVideo: videoMutation
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
    //subscriptiton:
});



server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});