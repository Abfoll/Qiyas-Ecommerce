import mongoose from 'mongoose';
import schema from 'mongoose';
const { Schema } = mongoose;
const orderItemSchema = new Schema({

    product:{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required:true
    },


    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },


    quantity:{
        type:Number,
        required:true,
        min:1
    },


    totalPrice:{
        type:Number,
        required:true,
        min:0
    },


    selectedcolor:{
        type:String,
        required:true
    },


    selectedsize:{
        type:String,
        required:true
    }


});
const orderSchema = new Schema({


    user:{

        type:Schema.Types.ObjectId,

        ref:"User",

        required:true

    },



    items:[orderItemSchema],



    totalAmount:{

        type:Number,

        required:true,

        min:0

    },



    shippingAddress:{


        street:{
            type:String
        },


        city:{
            type:String
        },


        state:{
            type:String
        },


        postalCode:{
            type:String
        },


        country:{
            type:String
        }


    },



    paymentStatus:{


        type:String,

        enum:[
            "pending",
            "paid",
            "failed"
        ],

        default:"pending"


    },



    orderStatus:{


        type:String,

        enum:[

            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled"

        ],

        default:"pending"


    },



    paymentId:{

        type:String

    }



},{

    timestamps:true

});

const Order = new  mongoose.model(
    "Order",
    orderSchema
);
export default Order;