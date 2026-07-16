import productType from "../typedef/product.js";
import productResolver from "../resolver/productResolver.js";

import {
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt,
    GraphQLInputObjectType
} from "graphql";



const VariantInput = new GraphQLInputObjectType({

    name:"VariantInput",

    fields:()=>({

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



const productMutation = {


    createProduct: {

        type:productType,


        args:{


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
                type:GraphQLID
            },


            gender:{
                type:GraphQLString
            },


            variants:{
                type:new GraphQLList(VariantInput)
            },


            featured:{
                type:GraphQLBoolean
            }


        },


        resolve:
        productResolver.Mutation.createProduct

    },





    updateProduct:{


        type:productType,


        args:{


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
                type:GraphQLID
            },


            gender:{
                type:GraphQLString
            },


            variants:{
                type:new GraphQLList(VariantInput)
            },


            featured:{
                type:GraphQLBoolean
            }


        },


        resolve:
        productResolver.Mutation.updateProduct

    },





    deleteProduct:{


        type:productType,


        args:{


            id:{
                type:GraphQLID
            }


        },


        resolve:
        productResolver.Mutation.deleteProduct

    }



};



export default productMutation;