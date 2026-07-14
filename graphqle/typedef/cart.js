import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList
} from "graphql";
const CartItemType = new GraphQLObjectType({
    name:"CartItem",
    fields:()=>({
        product:{
            type:GraphQLID
        },
  quantity:{
            type:GraphQLInt
        },

        size:{
            type:GraphQLString
        },

        color:{
            type:GraphQLString
        }

    })

});

const cartType = new GraphQLObjectType({

    name:"Cart",

    fields:()=>({

        id:{
            type:GraphQLID
        },


        user:{
            type:GraphQLID
        },


        items:{
            type:new GraphQLList(CartItemType)
        },


        totalPrice:{
            type:GraphQLFloat
        }

    })

});

export default cartType;