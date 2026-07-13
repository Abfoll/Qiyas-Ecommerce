import productType from "../typedef/product.js";
import productResolver from "../resolver/productResolver.js";

import {
    GraphQLList,
    GraphQLID
} from "graphql";


const productQuery = {


    products:{

        type:new GraphQLList(productType),

        resolve:
        productResolver.Query.products

    },


    product:{

        type:productType,

        args:{

            id:{
                type:GraphQLID
            }

        },

        resolve:
        productResolver.Query.product

    }


};


export default productQuery;