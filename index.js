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
        user: 'johnswaroop28@gmail.com',
        pass: 'apr2011_'
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

    console.log(req.body.data);

    var arr = req.body.data;

    res.send(arr);

    var tomail=arr[11];
    var toname=arr[0]+'   '+arr[1];

    console.log(tomail+toname);
  
    var mailOptions = {
        from: '"forge mail" <mailmodule@forge.com>',
        to: tomail+',mailmodule@alumnustest.forge.org.in',
        subject: 'Forge Board of Advisors Candidate Application',
        text: 'Thank you for registering , we look forward to working with you',
        html: '<h1>'+toname+'</h1><br><h2>'+tomail+'</h2><br><h3>Thank you for registering , we look forward to working with you</h3>',
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