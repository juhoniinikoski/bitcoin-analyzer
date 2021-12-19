import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './graphql/schema.js'

const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})