import {
    GraphQLEnumType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLFloat
} from "graphql";


const GenderTarget = new GraphQLEnumType({

    name:"GenderTarget",

    values:{

        MEN:{
            value:"men"
        },

        WOMEN:{
            value:"women"
        },

        KIDS:{
            value:"kids"
        }

    }

});



const productType = new GraphQLObjectType({

    name:"Product",

    fields:()=>({

        id:{
            type:GraphQLID
        },


        name:{
            type:GraphQLString
        },


        price:{
            type:GraphQLFloat
        },


        description:{
            type:GraphQLString
        },


        images:{
            type:new GraphQLList(GraphQLString)
        },


        gender:{
            type:GenderTarget
        },


        featured:{
            type:GraphQLBoolean
        }


    })

});


export default productType;