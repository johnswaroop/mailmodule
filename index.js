const express = require("express");

const app= express()


app.get('/',(req, res)=>{

    res.send("working");
    console.log('get request');
});

app.listen(3000,()=>{
    console.log('server running');
});


app.post('/',(req,res)=>{

    console.log('post request');



})