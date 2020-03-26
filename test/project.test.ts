import { expect } from "chai";
import "mocha";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "../src/type-defs";

describe("query for project", () => {
  it("returns a project which has the specified slug", async () => {
    const resolvers = {
      Query: {
        project() {
          return {
            id: 0,
            name: "name",
            slug: "slug",
            language: {
              code: "ja",
              name: "Japanese",
            },
          };
        },
      },
    };

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    const query = `
        query findProject {
          project(slug: "slug") {
            id,
            name
          }
        }
        `;

    const result = await graphql(schema, query);
    expect(result.data).to.deep.equal({
      project: {
        id: 0,
        name: "name",
      },
    });
  });
  it("returns all accessible projects", async () => {
    const resolvers = {
      Query: {
        projects() {
          return [
            {
              id: 0,
              name: "name0",
              slug: "slug0",
            },
            {
              id: 1,
              name: "name1",
              slug: "slug1",
            },
          ];
        },
      },
    };

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    const query = `
        query listProjects {
          projects {
            id,
            name
          }
        }
        `;

    const result = await graphql(schema, query);
    expect(result.data).to.deep.equal({
      projects: [
        {
          id: 0,
          name: "name0",
        },
        {
          id: 1,
          name: "name1",
        },
      ],
    });
  });
});
