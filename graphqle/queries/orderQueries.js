import OrderType from "../typedef/order.js";
import orderResolver from "../resolver/orderResolver.js";

import {
    GraphQLID,
    GraphQLList
} from "graphql";



const orderQuery = {


    orders:{

        type:new GraphQLList(OrderType),

        resolve:
        orderResolver.Query.orders

    },



    order:{


        type:OrderType,


        args:{

            id:{
                type:GraphQLID
            }

        },


        resolve:
        orderResolver.Query.order

    },



    userOrders:{


        type:new GraphQLList(OrderType),


        args:{


            userId:{
                type:GraphQLID
            }


        },


        resolve:
        orderResolver.Query.userOrders

    }


};



export default orderQuery;