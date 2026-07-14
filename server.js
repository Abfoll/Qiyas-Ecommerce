import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {graphqlHTTP} from "express-graphql";

import schema from "./graphqle/schema.js";

import connectDB from "./config/database.js";

import context from "./graphqle/context/index.js";


dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());


connectDB();



app.use(
"/graphql",

graphqlHTTP(async(req)=>({

    schema,

    graphiql:true,

    context: await context(req)

}))

);



app.listen(
process.env.PORT,
()=>{

console.log(
`Server running on port ${process.env.PORT}`
);

});