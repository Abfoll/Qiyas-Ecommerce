import categoryType from "../typedef/category.js";

import categoryResolver from "../resolver/categoryResolver.js";


import {

    GraphQLString,

    GraphQLID

} from "graphql";




const categoryMutation = {



createCategory:{


    type:categoryType,


    args:{


        name:{
            type:GraphQLString
        },


        description:{
            type:GraphQLString
        },


        image:{
            type:GraphQLString
        }


    },


    resolve:
    categoryResolver.Mutation.createCategory


},





updateCategory:{


    type:categoryType,


    args:{


        id:{
            type:GraphQLID
        },


        name:{
            type:GraphQLString
        },


        description:{
            type:GraphQLString
        },


        image:{
            type:GraphQLString
        }


    },


    resolve:
    categoryResolver.Mutation.updateCategory


},





deleteCategory:{


    type:categoryType,


    args:{


        id:{
            type:GraphQLID
        }


    },


    resolve:
    categoryResolver.Mutation.deleteCategory


}



};



export default categoryMutation;