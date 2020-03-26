const typeDefs = `
type Language {
  code: String,
  name: String
}
type Project {
  id: Int,
  name: String,
  slug: String,
  language: Language
}
type Query {
  projects: [Project]
  project(slug: String): Project
}
schema {
  query: Query
}
`;

export default typeDefs;