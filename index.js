const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors')

const app= express()

app.use(cors());

app.get('/',(req, res)=>{

    res.send("working");
    console.log('get request');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/',(req,res)=>{

    console.log('post request');
     
    console.log(req.body.data);
    
    var arr= req.body.data;

    res.send(arr);

})

app.listen(8080,()=>{
    console.log('server running');
});
