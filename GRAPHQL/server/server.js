import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { connectDB } from "./config/database.js";
import { typeDefs } from "./graphql/typeDefs/index.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { buildContext } from "./graphql/context/index.js";

async function start() {
  await connectDB();

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(",");

  app.use(
    "/graphql",
    cors({ origin: allowedOrigins, credentials: true }),
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    })
  );

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`GraphQL server ready at http://localhost:${port}/graphql`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});