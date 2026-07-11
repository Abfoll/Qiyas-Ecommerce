require('dotenv').config();
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { createContext } = require('./graphql/context');

const PORT = process.env.PORT || 5000;

// Database connection (optional for now – you can comment it out if you don't have MongoDB running)
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ MongoDB error:', err));

// Build schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create Apollo Server
const server = new ApolloServer({
  schema,
  introspection: process.env.NODE_ENV !== 'production',
});

// Start the server
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => createContext({ req }),
    listen: { port: PORT },
  });

  console.log(`🚀 GraphQL server ready at ${url}`);
  console.log(`📖 Environment: ${process.env.NODE_ENV}`);
}

startServer();