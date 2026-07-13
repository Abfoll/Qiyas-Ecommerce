import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";

import schema from "./graphqle/schema.js";
import connectDB from "./config/database.js";


dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());


connectDB();


app.use("/graphql",
    graphqlHTTP({
        schema,
        graphiql:true
    })
);


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});