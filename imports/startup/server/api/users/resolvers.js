import Users from '../users'

import { Meteor } from 'meteor/meteor'

// Logging for maping user objectdd

const USERS = Meteor.users.find().fetch({})

console.log(USERS);


export default {

    Query:{
        users(obj,arg,{userId}){
                return Meteor.users.find().fetch({})
        }
    },
    Mutation:{
        AddUser(obj,{name,email,phone},context){
        const userId = Users.insert({name,email,phone})
        return Users.findOne(userId)
    }
}
}