const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors')
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
const app = express();
require('dotenv').config();
app.use(cors());

const adv_route = require('./routes/advisors');
const amb_route = require('./routes/amb');

///// body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

///// get request
app.get('/', (req, res) => {


    console.log('get request');
    res.send("working");

});

//// routes




app.use('/', adv_route);

app.use('/amb', amb_route);





app.listen(8080, () => {
    console.log('server running');
});