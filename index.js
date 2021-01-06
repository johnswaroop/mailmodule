const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors')
var nodemailer = require('nodemailer');

const app = express()

require('dotenv').config();
app.use(cors());



var transport = nodemailer.createTransport({
    // service: "gmail",
    // secure: false, //true
    // port: 587,
    service: 'SendGrid',
    auth: {
        user: 'apikey',
        pass: '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'
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

const ejs = require("ejs");
var draft;
app.post('/', (req, res) => {

    console.log('post request');

    console.log(req.body);

    tomail = req.body.mail;
    toname = req.body.name;
    company = req.body.company;
    title = req.body.title;

    ejs.renderFile(__dirname + "/draft.ejs", {
        name: toname
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {

            draft = data;
            console.log(draft);
        }
    });







    var mailOptions = {
        from: '"forge mail" <advisors@forgealumnus.com>',
        to: 'advisors@forgealumnus.com,mailmodule@alumnustest.forge.org.in',
        subject: 'Forge Alumnus welcomes you to be part of Advisory Board',
        text: 'Thank you for registering , we look forward to working with you',
        html: '<h1>Thank you for registering,<br>Your Application has been submitted.<br>Our team will contact you soon and we look forward to working with you.</h1><br><h1>' + toname + '<br>' + title + '<br>' + company + '<br>' + tomail + '</h1>',


    };

    var mailOptions_invite = {
        from: '"FORGE ALUMNUS" <advisors@forgealumnus.com>',
        to: tomail,
        subject: 'Forge Alumnus welcomes you to be part of Advisory Board',
        text: 'Thank you for registering , we look forward to working with you',
        html: draft,


    };


    // transport.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    // });

    transport.sendMail(mailOptions_invite, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

})

//////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/amb', (req, res) => {

    console.log('post request amb');

    console.log(req.body);

    tomail_b = req.body.mail;
    toname_b = req.body.name;
    year_b = req.body.year;
    dept_b = college = req.body.dept;
    college_b = req.body.college;
    company_b = req.body.company;

    var draft_amb;

    ////////////////html mail render
    ejs.renderFile(__dirname + "/draft_amb.ejs", {
        name: toname_b
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {

            draft_amb = data;
            console.log(draft_amb);
        }
    });

     //// to client
    var mailOptions = {
        from: '"forge mail" <advisor@forge.org.in>',
        to: tomail_b + ',ambassadors@forgealumnus.com,mailmodule@alumnustest.forge.org.in',
        subject: 'We are pleased to welcome you as a new member of the Forge Ambassadors',
        text: 'Thank you for registering , we look forward to working with you',
        html: draft_amb,


    };
    
    ///// confirmation mail to godady
    var mailOptions_invite_amb = {
        from: '"forge mail" <advisor@forge.org.in>',
        to:'ambassadors@forgealumnus.com,mailmodule@alumnustest.forge.org.in',
        subject: 'Forge Ambassador Candidate Application success',
        text: 'Thank you for registering , we look forward to working with you',
        html: '<h1>Thank you for registering,<br>Your Application has been submitted.<br>Our team will contact you soon and we look forward to working with you.</h1><br><h1>' + toname_b + '<br>' + year_b + '<br>' + dept_b + '<br>' + college_b + '<br>' + company_b + '<br>' + tomail_b + '</h1>',


    };


    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
      

    /// local
    transport.sendMail(mailOptions_invite_amb, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
  
})

app.listen(8080, () => {
    console.log('server running');
});