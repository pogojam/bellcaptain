import { Meteor } from 'meteor/meteor'
import { GraphQLScalarType } from 'graphql';




const DateScalar = new GraphQLScalarType({
    name:'DateScalarType',
    description:'converts into a date for graphql',
    serialize(val){
        return val
    },
    parseValue(val){
        return val
    },
    parseLiteral(ast) {  
        switch (ast.kind) {
          // Implement your own behavior here by returning what suits your needs
          // depending on ast.kind
        }
      }
})



export default {
    DateScalarType:DateScalar,
    Query:{
        user(obj,arg,{user}){

            return user
        },    
        users(obj,arg,{userId}){
                return Meteor.users.find().fetch({})
        }
    },
     Mutation :{
         updateUser(obj,{name,email,phone},{user}){
             Meteor.users.update({_id:user._id},{$set:{emails:[{address:email}],profile:{name:name,phone:phone}}})
             data = Meteor.users.find({_id:user._id}).fetch()
             console.log(data.profile)  
             return   data[1]    
         }
     },
    User:{
        loggedIn(obj,arg,{user}){
            return obj._id===user._id?true:false
        },
        email(obj,arg,{user}){
            return obj.emails[0].address
        },
        name(obj,arg,{user}){
            return obj.profile.name
        },
        phone(obj,arg,{user}){
            return user.profile.phone
        }
    }
}