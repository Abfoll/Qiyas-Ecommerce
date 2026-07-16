import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt
} from "graphql";

import categoryType from "./category.js";


const ProductVariantType = new GraphQLObjectType({

    name:"ProductVariant",

    fields:()=>({
        id:{
            type:GraphQLID
        },
        color:{
            type:GraphQLString
        },


        size:{
            type:GraphQLString
        },


        stock:{
            type:GraphQLInt
        }

    })

});



const productType = new GraphQLObjectType({

    name:"Product",

    fields:()=>({

        id:{
            type:GraphQLID
        },


        name:{
            type:GraphQLString
        },


        description:{
            type:GraphQLString
        },


        price:{
            type:GraphQLFloat
        },


        images:{
            type:new GraphQLList(GraphQLString)
        },


        category:{
            type:categoryType
        },


        gender:{
            type:GraphQLString
        },


        variants:{
            type:new GraphQLList(ProductVariantType)
        },


        featured:{
            type:GraphQLBoolean
        },


        rating:{
            type:GraphQLFloat
        }

    })

});


export default productType;