import categoryType from "../typedef/category.js";
import categoryResolver from "../resolver/categoryResolver.js";

import {
    GraphQLList,
    GraphQLID
} from "graphql";


const categoryQuery = {

    categories:{

        type:new GraphQLList(categoryType),

        resolve: categoryResolver.Query.categories

    },


    category:{

        type:categoryType,

        args:{
            id:{
                type:GraphQLID
            }
        },

        resolve: categoryResolver.Query.category

    }

};


export default categoryQuery;