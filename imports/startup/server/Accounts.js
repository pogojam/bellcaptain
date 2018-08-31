
// Validate Account with Invite Token

Accounts.validateNewUser(user=>{
        

        const Token = '91837!'
        const userKey = user.profile.key

        if(userKey===Token){
            return true
            console.log(user);
        }
        else{
            throw new Meteor.Error(420, 'Must have a Valid key to make an Account');
        }
})

