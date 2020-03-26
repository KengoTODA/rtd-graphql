const typeDefs = `
type Language {
  code: String!,
  name: String!
}
type Project {
  id: Int!,
  name: String!,
  slug: String!,
  language: Language!
}
type Query {
  ok: String!,
  projects: [Project],
  project(slug: String!): Project
}
`;

export default typeDefs;
