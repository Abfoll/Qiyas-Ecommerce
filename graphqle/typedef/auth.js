import {
GraphQLObjectType,
GraphQLString
} from "graphql";

import userType from "./user.js";
const authType = new GraphQLObjectType({

name:"Auth",

fields:()=>({
token:{
type:GraphQLString
},
user:{
type:userType
}

})

});

export default authType;