import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList
} from "graphql";


const wishlistType = new GraphQLObjectType({

    name:"Wishlist",

    fields:()=>({

        id:{
            type:GraphQLID
        },


        user:{
            type:GraphQLID
        },


        products:{
            type:new GraphQLList(GraphQLID)
        }

    })

});
export default wishlistType;