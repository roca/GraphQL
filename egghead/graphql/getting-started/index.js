'use strict';

const express = require('express');

const graphqlHTTP = require('express-graphql');

const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');

const { getVideoById } = require('./src/data');

const PORT = process.env.PORT || 3000;

const server = express();

const VideoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video on EggHead.io',
    fields: {
        id: { type: GraphQLID, description: 'The id of the video.'  },
        title: { type: GraphQLString, description: 'The title of the video.' },
        duration: { type: GraphQLInt, description: 'The duration of the video (in seconds).'  },
        watched: { type: GraphQLBoolean, description: 'Whether or not the viewer has watched the video'  }
    }
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        video: { 
            type: VideoType,
            args: {
                id: { type: GraphQLID, description: 'The id of the video.'  }
            },
            resolve: (_, args) => getVideoById(args.id)
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType
    //mutation:
    //subscriptiton:
});



server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});