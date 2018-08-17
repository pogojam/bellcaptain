import { Meteor } from 'meteor/meteor'

// Logging for maping user objectdd

const USERS = Meteor.users.find().fetch({})

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
        loggedIn(user){
            return user._id?true:false
        }
    },
    Mutation:{
        AddUser(obj,{name,email,phone},context){
        const userId = Users.insert({name,email,phone})
        return Users.findOne(userId)
    }
}
}