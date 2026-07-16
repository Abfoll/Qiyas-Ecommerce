import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList
} from "graphql";



const OrderItemType = new GraphQLObjectType({

    name:"OrderItem",

    fields:()=>({

        product:{
            type:GraphQLID
        },

        quantity:{
            type:GraphQLInt
        },

        size:{
            type:GraphQLString,
            resolve:(item)=>{
                return item.size || null;
            }
        },

        color:{
            type:GraphQLString,
            resolve:(item)=>{
                return item.color || null;
            }
        },

        price:{
            type:GraphQLFloat
        }

    })

});



const ShippingAddressType = new GraphQLObjectType({

    name:"ShippingAddress",

    fields:()=>({

        street:{
            type:GraphQLString
        },


        city:{
            type:GraphQLString
        },


        country:{
            type:GraphQLString
        },


        phone:{
            type:GraphQLString
        }

    })

});


const orderType = new GraphQLObjectType({

name:"Order",

fields:()=>({

    id:{
        type:GraphQLID
    },

    user:{
        type:GraphQLID
    },

    items:{
        type:new GraphQLList(OrderItemType)
    },

    shippingAddress:{
        type:ShippingAddressType
    },

    totalAmount:{
        type:GraphQLFloat
    },

    paymentStatus:{
        type:GraphQLString
    },

    orderStatus:{
        type:GraphQLString
    }

})

});


export default orderType;