import OrderType from "../typedef/order.js";
import orderResolver from "../resolver/orderResolver.js";
import  {

    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLInt

}from 'graphql';



const OrderItemInput = new GraphQLInputObjectType({

    name:"OrderItemInput",

    fields:{

        product:{
            type:GraphQLID
        },

        quantity:{
            type:GraphQLInt
        },

        totalPrice:{
            type:GraphQLFloat
        },

        selectedcolor:{
            type:GraphQLString
        },

        selectedsize:{
            type:GraphQLString
        }

    }

});



const ShippingInput = new GraphQLInputObjectType({

    name:"ShippingInput",

    fields:{

        street:{
            type:GraphQLString
        },

        city:{
            type:GraphQLString
        },

        state:{
            type:GraphQLString
        },

        postalCode:{
            type:GraphQLString
        },

        country:{
            type:GraphQLString
        }

    }

});
const orderMutation = {


createOrder:{


    type:OrderType,


    args:{


        user:{
            type:GraphQLID
        },


        items:{
            type:new GraphQLList(OrderItemInput)
        },


        totalAmount:{
            type:GraphQLFloat
        },


        shippingAddress:{
            type:ShippingInput
        }


    },


    resolve:
    orderResolver.Mutation.createOrder


},
updateOrderStatus:{
    type:OrderType,
    args:{
        id:{
            type:GraphQLID
        },
        orderStatus:{
            type:GraphQLString
        },
        paymentStatus:{
            type:GraphQLString
        }
    },


    resolve:
    orderResolver.Mutation.updateOrderStatus


},



deleteOrder:{


    type:OrderType,


    args:{

        id:{
            type:GraphQLID
        }

    },


    resolve:
    orderResolver.Mutation.deleteOrder


}


};
export default orderMutation;