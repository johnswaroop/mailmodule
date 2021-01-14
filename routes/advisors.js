const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');
const ejs = require("ejs");
var draft;


var transport = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'apikey',
        pass: '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'
    }

});



router.post('/', (req, res) => {

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
        from: '"FORGE ALUMNUS" <advisors@forgealumnus.com>',
        to: 'mailmodule@alumnustest.forge.org.in',
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


    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

    transport.sendMail(mailOptions_invite, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

});

module.exports = router;