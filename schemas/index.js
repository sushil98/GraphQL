const { gql } = require('apollo-server-express')

const typeDefs = gql`
  directive @isAdmin on FIELD_DEFINITION
  type User {
    id: Int!
    username: String!
    email: String!
    isAdmin: Boolean!
    
  }
 
  type Actors{
    id: ID!
    name: String
    birthday: String
    country: String
    directors: [Directors]
    movieId:AllMovies
  }

  type AllMovies{
    scoutbase_rating: String
    id: ID!
    title: String
    year: String
    rating: String
    actors:[Actors]
    actor(_id: ID!): Actors
  }
  type AllMoviesWithoutAuthorized{
    id: ID!
    title: String
    year: String
    rating: String
    actors:[Actors]
    actor(_id: ID!): Actors
  }

  type Directors
  {
    id:ID
    name: String
    birthday: String
    country: String
  }


  type LoginResponse{
    token: String!
    user: User
  }

  type AddMovieResponse{
    id:ID!
    title: String
    year: String
    rating: String
  }

  type AddActorResponse{
    id: ID!
    name: String
    birthday: String
    country: String
  }
    
type NonAuthenticate{
  movies:[AllMoviesWithoutAuthorized] 
}
  
type Query {
    nonAuthenticate: [NonAuthenticate]
    allUsers: [User]! @isAdmin
    movies:[AllMovies]  @isAdmin
    movie(id: ID!): AllMovies  @isAdmin
    actors:[Actors]  @isAdmin
    actor(id: ID!): Actors  @isAdmin
    directors:[Directors]  @isAdmin
  }
  
  type Mutation {
    Signup(username: String!, email: String!, password: String!,is_admin:Boolean!): LoginResponse
    login(email: String!, password: String!): LoginResponse
    addMovie(title: String!, year: String!, rating: String!): AddMovieResponse
    addActor(movieId: ID!,name: String!, birthday: String!, country: String!): AddActorResponse
    addDirector(actorId: Int!, name: String!, birthday: String!, country: String!): Directors
  }
`
module.exports = typeDefs