const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Movie {
    id: ID!
    title: String!
    director: String
    releaseYear: Int
    rating: Float
  }

  type Query {
    getMovie(id: ID!): Movie
    getMovies: [Movie]
  }

  type Mutation {
    addMovie(title: String!, director: String, releaseYear: Int, rating: Float): Movie
    updateMovie(id: ID!, title: String, director: String, releaseYear: Int, rating: Float): Movie
    deleteMovie(id: ID!): String
  }
`);

module.exports = schema;
