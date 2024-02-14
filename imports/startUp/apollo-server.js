import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors';
import { json } from 'body-parser';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebApp } from 'meteor/webapp';
import depthLimit from 'graphql-depth-limit'
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import typeDefs_board from '/imports/api/board/schemas';
import resolvers_board from '/imports/api/board/resolvers_origin';
// import resolvers_board from '/imports/api/board/resolvers_nova';

import typeDefs_human from '/imports/api/human/schemas';
import resolvers_human from '/imports/api/human/resolvers';

(async function(){

  const typeDefs = [typeDefs_board, typeDefs_human];
  const resolvers = [resolvers_board, resolvers_human];

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // subscript setting start
  const wsServer = new WebSocketServer({
    noServer: true,
    path: "/graphql",
  });

  WebApp.httpServer.on('upgrade', (request, socket, head) => {
    if(request.url === '/graphql') {
      return wsServer.handleUpgrade(request, socket, head, done = (ws) => {
        wsServer.emit("connection", ws, request);
      });            
    }
    else {
      return;
    }
  });
  
  const serverCleanup = useServer({schema}, wsServer);    
  // subscript setting end

  const app = express();

  const server = new ApolloServer({
    schema,
    // validationRules: [depthLimit(2)],
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },            
          }
        }
      }      
    ]
  })

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
