import userType from "../typedef/user.js";
import authType from "../typedef/auth.js";
import userResolver from "../resolver/userResolver.js";

import {
    GraphQLID,
    GraphQLString
} from "graphql";


const userMutation = {


    loginUser:{

        type:authType,

        args:{

            email:{
                type:GraphQLString
            },

            password:{
                type:GraphQLString
            }

        },

        resolve:
        userResolver.Mutation.loginUser

    },



    createUser: {

        type:userType,

        args:{

            name:{
                type:GraphQLString
            },

            email:{
                type:GraphQLString
            },

            password:{
                type:GraphQLString
            }

        },

        resolve:
        userResolver.Mutation.createUser

    },


 
    updateUser: {

        type:userType,

        args:{


            id:{
                type:GraphQLID
            },


            name:{
                type:GraphQLString
            },


            email:{
                type:GraphQLString
            },


            password:{
                type:GraphQLString
            }


        },

        resolve:
        userResolver.Mutation.updateUser

    },



    deleteUser: {

        type:userType,

        args:{

            id:{
                type:GraphQLID
            }

        },

        resolve:
        userResolver.Mutation.deleteUser

    }


};


export default userMutation;