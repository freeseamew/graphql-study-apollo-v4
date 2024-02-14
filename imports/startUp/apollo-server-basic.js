import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors';
import { json } from 'body-parser';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebApp } from 'meteor/webapp';
import { gql } from 'graphql-tag';

(async function(){

  // schema 정의
  const typeDefs = gql`
    type Human {
      humanName: String
      blood: String
      sex: String
      age: Int
    }

    type Query {
      humans: [Human]
    }
  `

  // 정의된 schema를 실제 구동되도록 하는 resolver
  const resolvers = {
    Query: {
      async humans(_, args, context, info) {

        humanData = [
          {
            humanName: 'name_1',
            blood: 'A',
            Gender: 'male',
            age: 12
          },
          {
            humanName: 'name_2',
            blood: 'B',
            Gender: 'female',
            age: 22
          },
          {
            humanName: 'name_3',
            blood: 'O',
            Gender: 'male',
            age: 42
          },
          {
            humanName: 'name_4',
            blood: 'A',
            Gender: 'male',
            age: 32
          },                        
        ]
        return humanData;
      }
    }
  }

  // schema + resolver
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const app = express();

  const server = new ApolloServer({
    schema,
    plugins: []
  });

  await server.start();

  app.use(
    json(),
    cors(),
    expressMiddleware(server, {})
  );

  WebApp.connectHandlers.use(
    '/graphql',
    app,
  );

})();
