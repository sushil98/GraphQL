const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const jwt = require('express-jwt')
require('dotenv').config()
const typeDefs = require('./schemas')
const resolvers = require('./resolvers')
const IsAdminDirective = require('./directives/isAdmin')

const port = 4000
const path = '/graphql'
const app = express()

app.use(
  path,
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
  })
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    isAdmin: IsAdminDirective
  },
  context: ({ req }) => ({
    user: req.user
  })
})

server.applyMiddleware({ app, path })

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${port}${server.graphqlPath}`);
});
