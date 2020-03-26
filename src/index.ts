import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import typeDefs from "./type-defs";
import resolver from "./resolver";
import { IncomingMessage } from "http";

// Construct a schema, using GraphQL schema language
var schema = buildSchema(typeDefs);

// // The root provides a resolver function for each API endpoint
// function createRoot(authorization?: string) {
//   const option = authorization === undefined ? {} : { headers: { Authorization: authorization } };
//   return {
//     Query: {
//       projects(obj, args, context, info) {
//         const projects = await fetch(`https://readthedocs.org/api/v3/projects/`, option)
//         .then(res => {
//           if (res.status !== 200) {
//             throw new Error(`Failed to list projects: ${res.statusText}`)
//           }
//           return res.json();
//         });
//         return projects;
//       },
//       project: async function (slug: string) {
//         const project = await fetch(`https://readthedocs.org/api/v3/projects/${escape(slug)}/`, option)
//         .then(res => {
//           if (res.status !== 200) {
//             throw new Error(`Project not found for the given slug ${slug}: ${res.statusText}`)
//           }
//           return res.json();
//         })
//         .then(result => result.results);
//         return project;
//       }
//     }
//   };
// }

const app = express();
const isDevelop = process.env.NODE_ENV === "development";

app.use(
  "/graphql",
  graphqlHTTP(async (request: IncomingMessage) => ({
    schema,
    rootValue: resolver,
    context: {
      authorization: isDevelop
        ? `Token ${process.env.RTD_TOKEN}`
        : request.headers.authorization,
    },
    graphiql: true,
  }))
);
app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
