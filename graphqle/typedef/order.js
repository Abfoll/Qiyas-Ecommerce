import {
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from "graphql";



const orderItemType = new GraphQLObjectType({

    name:"OrderItem",

    fields:()=>({


        id:{
            type:GraphQLID
        },


        product:{
            type:GraphQLID
        },


        user:{
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


        state:{
            type:GraphQLString
        },


        postalCode:{
            type:GraphQLString
        },


        country:{
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
            type:new GraphQLList(orderItemType)
        },


        totalAmount:{
            type:GraphQLFloat
        },


        shippingAddress:{
            type:ShippingAddressType
        },


        paymentStatus:{
            type:GraphQLString
        },


        orderStatus:{
            type:GraphQLString
        },


        paymentId:{
            type:GraphQLString
        },


        createdAt:{
            type:GraphQLString
        },


        updatedAt:{
            type:GraphQLString
        }


    })

});



export default orderType;