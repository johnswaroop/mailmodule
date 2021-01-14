const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');
const ejs = require("ejs");


var transport = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'apikey',
        pass: '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'
    }

});



router.post('/', (req, res) => {

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
        from: '"FORGE ALUMNUS" <ambassadors@forgealumnus.com>',
        to: tomail_b + ',ambassadors@forgealumnus.com,mailmodule@alumnustest.forge.org.in',
        subject: 'We are pleased to welcome you as a new member of the Forge Ambassadors',
        text: 'Thank you for registering , we look forward to working with you',
        html: draft_amb,


    };

    ///// confirmation mail to godady
    var mailOptions_invite_amb = {
        from: '"FORGE ALUMNUS" <ambassadors@forgealumnus.com>',
        to: 'mailmodule@alumnustest.forge.org.in',
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


module.exports = router;