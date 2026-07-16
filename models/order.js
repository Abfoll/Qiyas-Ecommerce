import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({


    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    items:[

        {


            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },


            quantity:{
    type:Number,
    required:true,
    min:1
},


            size:String,


            color:String,


           price:{
    type:Number,
    required:true,
    min:0
},


        }

    ],



    shippingAddress:{


        street:String,

        city:String,

        country:String,

        phone:String

    },



    totalAmount:{
        type:Number,
        required:true
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
            "processing",
            "shipped",
            "delivered",
            "cancelled"
        ],

        default:"processing"
    }



},{timestamps:true});



export default mongoose.model(
    "Order",
    orderSchema
);