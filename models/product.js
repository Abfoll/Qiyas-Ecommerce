import mongoose from "mongoose";


const { Schema } = mongoose;



const productVariantSchema = new Schema({

    color:{
        type:String,
        required:true
    },


    size:{
        type:String,
        required:true
    },


    stock:{
        type:Number,
        required:true,
        min:0
    }

});



const productSchema = new Schema({


    name:{

        type:String,

        required:true

    },


    price:{

        type:Number,

        required:true,

        min:0

    },


    description:{

        type:String,

        required:true

    },


    images:[{

        type:String,

        required:true

    }],



    category:{

        type:Schema.Types.ObjectId,

        ref:"Category",

        required:true

    },



    variants:[productVariantSchema],



    gender:{

        type:String,

        required:true,

        enum:[

            "men",
            "women",
            "kids"

        ]

    },



    featured:{

        type:Boolean,

        default:false

    }



},{

    timestamps:true

});



export default mongoose.model(
    "Product",
    productSchema
);