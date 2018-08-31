import twilio from "twilio";
const accountSid = 'ACad678d8906a6419e29511e79cede8445'; 
const authToken = 'c3af41ba0f6b50fbcf65445311640c5b'; 



client = new twilio(accountSid, authToken);


export default sendSMS= (msg,phone)=>{

 return   client.messages 
    .create({
        body:msg,  
        from: '+19286123179',       
        to: phone 
    }) 
    .then(message => console.log(message.sid)) 
    .done();
}
