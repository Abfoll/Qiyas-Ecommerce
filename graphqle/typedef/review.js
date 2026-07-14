import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from "graphql";


const reviewType = new GraphQLObjectType({

    name:"Review",

    fields:()=>({

        id:{
            type:GraphQLID
        },


        user:{
            type:GraphQLID
        },


        product:{
            type:GraphQLID
        },


        rating:{
            type:GraphQLInt
        },


        comment:{
            type:GraphQLString
        },


        images:{
            type:new GraphQLList(GraphQLString)
        }

    })

});


export default reviewType;