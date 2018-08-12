import {createApolloServer} from 'meteor/apollo'
import {makeExecutableSchema} from 'graphql-tools'
import { merge } from "lodash";
import CashdropsSchema from "./server/api/Cashdrops/Cashdrops.graphql";
import CashdropResolver from './server/api/Cashdrops/resolvers'
import UserSchema from './server/api/users/users.graphql'
import UserResolver from './server/api/users/resolvers'

const testSchema = `
type Query {
        hi:String
}
`

const testResolver = { 
    Query:{
        hi(){return 'hi'}
    }
}

const typeDefs = [testSchema,CashdropsSchema,UserSchema]
const resolvers =   merge(testResolver,CashdropResolver,UserResolver)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

createApolloServer({schema})

console.log('Server Up')

