import productType from "../typedef/product.js";
import productResolver from "../resolver/productResolver.js";
import {
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean
} from 'graphql';
const productMutation = {


    createProduct: {

        type: productType,

        args: {

            name: {
                type: GraphQLString
            },

            price: {
                type: GraphQLFloat
            },

            description: {
                type: GraphQLString
            },

            featured: {
                type: GraphQLBoolean
            }

        },


        resolve: productResolver.Mutation.createProduct

    },



    updateProduct: {

        type: productType,


        args: {

            id: {
                type: GraphQLID
            },

            name: {
                type: GraphQLString
            },

            price: {
                type: GraphQLFloat
            },

            description: {
                type: GraphQLString
            },

            featured: {
                type: GraphQLBoolean
            }

        },


        resolve: productResolver.Mutation.updateProduct

    },



    deleteProduct: {

        type: productType,


        args: {

            id: {
                type: GraphQLID
            }

        },


        resolve: productResolver.Mutation.deleteProduct

    }


};

export default productMutation;