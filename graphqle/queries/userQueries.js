import userType from "../typedef/user.js";
import userResolver from "../resolver/userResolver.js";

import {
    GraphQLList,
    GraphQLID
} from "graphql";



const userQuery = {


    users:{

        type:new GraphQLList(userType),

        resolve:
        userResolver.Query.users

    },



    user:{


        type:userType,


        args:{


            id:{

                type:GraphQLID

            }


        },


        resolve:
        userResolver.Query.user


    }


};



export default userQuery;