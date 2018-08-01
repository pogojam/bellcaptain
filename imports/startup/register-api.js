import {createApolloServer} from 'meteor/apollo'
import {makeExecutableSchema} from 'graphql-tools'
import { merge } from "lodash";

const testSchema = `
type Query {
        hi:String
}
`

const testResolver = {
    Query:{
        hi(obj,arg,context){
            console.log(context)
            return 'hi'
        }
    }
}

const typeDefs = [testSchema]
const resolvers =   merge(testResolver)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

createApolloServer({schema})

console.log('Server Up')

