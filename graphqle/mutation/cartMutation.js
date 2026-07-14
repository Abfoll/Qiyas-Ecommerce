import cartType from "../typedef/cart.js";
import cartResolver from "../resolver/cartResolver.js";

import {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLInputObjectType
} from "graphql";
const CartItemInput = new GraphQLInputObjectType({

    name: "CartItemInput",

    fields: {

        product: {
            type: GraphQLID
        },

        quantity: {
            type: GraphQLInt
        },

        size: {
            type: GraphQLString
        },

        color: {
            type: GraphQLString
        }

    }

});
const cartMutation = {
    createCart: {

        type: cartType,

        args: {

            user: {
                type: GraphQLID
            },

            items: {
                type: new GraphQLList(CartItemInput)
            }

        },

        resolve: cartResolver.Mutation.createCart

    },

    addToCart: {

        type: cartType,

        args: {

            userId: {
                type: GraphQLID
            },

            product: {
                type: GraphQLID
            },

            quantity: {
                type: GraphQLInt
            },

            size: {
                type: GraphQLString
            },

            color: {
                type: GraphQLString
            }

        },

        resolve: cartResolver.Mutation.addToCart

    },
    updateCartItem: {

        type: cartType,

        args: {

            cartId: {
                type: GraphQLID
            },

            itemId: {
                type: GraphQLID
            },

            quantity: {
                type: GraphQLInt
            }

        },

        resolve: cartResolver.Mutation.updateCartItem

    },
    removeCartItem: {

        type: cartType,

        args: {

            cartId: {
                type: GraphQLID
            },

            itemId: {
                type: GraphQLID
            }

        },

        resolve: cartResolver.Mutation.removeCartItem

    },
    deleteCart: {

        type: cartType,

        args: {

            id: {
                type: GraphQLID
            }

        },

        resolve: cartResolver.Mutation.deleteCart

    }


};
export default cartMutation;