import mongoose from "mongoose";
const productSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },


    images:[String],



    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },


    gender:{
        type:String,
        enum:[
            "men",
            "women",
            "kids"
        ],
        required:true
    },


    variants:[

        {

            color:String,


            size:{
                type:String,
                enum:[
                    "XS",
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL"
                ]
            },


            stock:{
                type:Number,
                default:0
            }

        }

    ],



    featured:{
        type:Boolean,
        default:false
    },


    rating:{
        type:Number,
        default:0
    }



},{timestamps:true});
export default mongoose.model(
    "Product",
    productSchema
);