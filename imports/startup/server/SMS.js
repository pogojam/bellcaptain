import twilio from "twilio";
const accountSid = Meteor.settings.twilow.t_sid;
const authToken = Meteor.settings.twilow.t_token; 



client = new twilio(accountSid, authToken);


export default sendSMS= (msg,phone)=>{

 return   client.messages 
    .create({
        body:msg,  
        from: '+19286123179',       
        to: phone 
    }) 
    .then(message => console.log(`SMS Sent to ${phone}` )) 
    .done();
}
