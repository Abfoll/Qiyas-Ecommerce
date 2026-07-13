import {
    GraphQLEnumType,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} from "graphql";



const RoleType = new GraphQLEnumType({

    name:"Role",

    values:{


        USER:{
            value:"user"
        },


        ADMIN:{
            value:"admin"
        }


    }

});



const userType = new GraphQLObjectType({

    name:"User",


    fields:()=>({


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
        },


        role:{
            type:RoleType
        },


        isVerified:{
            type:GraphQLBoolean
        }


    })


});



export default userType;