import {createApolloServer} from 'meteor/apollo'
import {makeExecutableSchema} from 'graphql-tools'
import { merge } from "lodash";
import CashdropsSchema from "./server/api/Cashdrops/Cashdrops.graphql";
import CashdropResolver from './server/api/Cashdrops/resolvers'
import UserSchema from './server/api/users/users.graphql'
import UserResolver from './server/api/users/resolvers'

const Schema = `
type Query {
        hi:String
        users:[User]
},
type Mutation{
    AddUser(name:String!,email:String,phone:ID):User
}
`

const Resolver = { 
    Query:{
        hi(){return 'hi'}
    }
}

const typeDefs = [Schema,CashdropsSchema,UserSchema]
const resolvers =   merge(Resolver,CashdropResolver,UserResolver)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

createApolloServer({schema})

console.log('Server Up')

