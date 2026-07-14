import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} from "graphql";
const categoryType = new GraphQLObjectType({

    name:"Category",

    fields:()=>({

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
        },


        createdAt:{
            type:GraphQLString
        },


        updatedAt:{
            type:GraphQLString
        }

    })

});
export default categoryType;