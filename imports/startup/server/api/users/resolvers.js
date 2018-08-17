import { Meteor } from 'meteor/meteor'

// Logging for maping user objectdd



console.log(Accounts);

export default {

    Query:{
        user(obj,arg,{user}){

            return user
        },    
        users(obj,arg,{userId}){

                return Meteor.users.find().fetch({})
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
            return user.profile.phoen
        }
    }
}