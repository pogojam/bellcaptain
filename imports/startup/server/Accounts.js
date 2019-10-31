// Validate Account with Invite Token

Accounts.validateNewUser(user => {
  // if(Meter.isDevelopment){
  //     return true
  // }
  const Token = "91837!";
  const userKey = user.profile.key;

  if (userKey === Token) {
    return true;
    console.log("New User Validated");
  } else {
    throw new Meteor.Error(420, "Must have a Valid key to make an Account");
  }
});
