import cartType from "../typedef/cart.js";
import cartResolver from "../resolver/cartResolver.js";


import {
    GraphQLList,
    GraphQLID
} from "graphql";



const cartQuery = {



    carts:{


        type:new GraphQLList(cartType),


        resolve:
        cartResolver.Query.carts


    },



    cart:{


        type:cartType,


        args:{


            id:{
                type:GraphQLID
            }


        },


        resolve:
        cartResolver.Query.cart


    },



    userCart:{


        type:cartType,


        args:{


            userId:{
                type:GraphQLID
            }


        },


        resolve:
        cartResolver.Query.userCart


    }



};


export default cartQuery;