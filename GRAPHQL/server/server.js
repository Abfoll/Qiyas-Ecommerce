import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { connectDB } from "./config/database.js";
import { typeDefs } from "./graphql/typeDefs/index.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { buildContext } from "./graphql/context/index.js";
import { upload } from "./middleware/upload.js";
import { requireAdminHttp } from "./middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function start() {
  await connectDB();

  const app = express();
  const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(",");
  const corsOptions = { origin: allowedOrigins, credentials: true };

  app.use("/uploads", cors(corsOptions), express.static(path.join(__dirname, "uploads")));

  app.post(
    "/api/upload",
    cors(corsOptions),
    requireAdminHttp,
    upload.single("image"),
    (req, res) => {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
      const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      res.json({ url });
    },
    (err, _req, res, _next) => {
      res.status(400).json({ error: err.message || "Upload failed." });
    }
  );

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(
    "/graphql",
    cors(corsOptions),
    express.json(),
    expressMiddleware(server, { context: buildContext })
  );

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`GraphQL server ready at http://localhost:${port}/graphql`);
    console.log(`Image upload endpoint at http://localhost:${port}/api/upload`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});