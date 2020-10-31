const express = require("express");

const app= express()


app.get('/',(req, res)=>{

    res.send("working");
    console.log('get request');
});



app.post('/',(req,res)=>{

    console.log('post request');



})

app.listen(8080,()=>{
    console.log('server running');
});
