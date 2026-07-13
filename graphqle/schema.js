import productQuery from "./queries/productQueries.js";
import userQuery from "./queries/userQueries.js";
import orderQuery from "./queries/orderQueries.js";

import productMutation from "./mutation/productMutation.js";
import userMutation from "./mutation/userMutation.js";
import orderMutation from "./mutation/orderMutation.js";
import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql';



const RootQuery = new GraphQLObjectType({

    name:"Query",

    fields:()=>{

        console.log("PRODUCT QUERY", productQuery);
        console.log("USER QUERY", userQuery);
        console.log("ORDER QUERY", orderQuery);

        return {

            ...productQuery,
            ...userQuery,
            ...orderQuery

        };

    }

});


const RootMutation = new GraphQLObjectType({

    name:"Mutation",

    fields:()=>{

        console.log("PRODUCT MUTATION", productMutation);
        console.log("USER MUTATION", userMutation);
        console.log("ORDER MUTATION", orderMutation);

        return {

            ...productMutation,
            ...userMutation,
            ...orderMutation

        };

    }

});



// Define schema
const schema = new GraphQLSchema({

    query: RootQuery,

    mutation: RootMutation

});


// Export schema
export default schema;