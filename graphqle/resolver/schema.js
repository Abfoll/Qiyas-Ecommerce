import graphql from 'graphql';
import productResolver from './productResolver';
const{ GraphqlSchema , GraphQLObjectType } = graphql;
const RootQuery= new GraphQLObjectType({
    name:"Query",
    fields:{
        productResolver

    }
})