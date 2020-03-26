import express from "express";
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import typeDefs from './type-defs';

// Construct a schema, using GraphQL schema language
var schema = buildSchema(typeDefs);

// The root provides a resolver function for each API endpoint
var root = {
  Query: {
    projects: function() {
      // TODO authentication
      // TODO return a list of accessible Project
    },
    project: function (slug: string) {
      // TODO return a single Project
    }
  }
};

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
