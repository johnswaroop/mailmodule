const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors')
var nodemailer = require('nodemailer');

const app = express()

require('dotenv').config();
app.use(cors());



var transport = nodemailer.createTransport({
    service: "gmail",
    secure: false,//true
    port: 587,
    auth: {
        user: 'forge.edu.mail@gmail.com',
        pass: 'Unlockurself20.'
    }
    
});



app.get('/', (req, res) => {

    
    console.log('get request');
    res.send("working");

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/', (req, res) => {

    console.log('post request');

    console.log(req.body);

    tomail=req.body.mail;
    toname=req.body.name;
    company=req.body.company;
    title=req.body.title;
    


    

    

   
  
     var mailOptions = {
         from: '"forge mail" <advisor@forge.org.in>',
         to: tomail +',advisors@forge.org.in,mailmodule@alumnustest.forge.org.in',
         subject: 'Forge Board of Advisors Candidate Application success',
         text: 'Thank you for registering , we look forward to working with you',
         html:  '<h1>Thank you for registering,<br>Your Application has been submitted.<br>Our team will contact you soon and we look forward to working with you.</h1><br><h1>'+toname+'<br>'+title+'<br>'+company+'<br>'+tomail+'</h1>',


     };
    

     transport.sendMail(mailOptions, (error, info) => {
        if (error) {
             return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
     });

})

app.listen(8080, () => {
    console.log('server running');
});