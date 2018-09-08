import { Meteor } from 'meteor/meteor'
import { GraphQLScalarType } from 'graphql';
import RunningTotals from '../../RunningTotals'



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
        },
        lifetotaldrop(obj,arg,{user}){
         tdrop = RunningTotals.find({userId:user._id}).fetch()
         console.log(tdrop)
         return tdrop[0].LifeTotalDrop
        },
        lifetotalcashback(obj,arg,{user}){
            tdrop = RunningTotals.find({userId:user._id}).fetch()
            console.log(tdrop)
            return tdrop[0].LifeTotalCashBack
           }
    }
}