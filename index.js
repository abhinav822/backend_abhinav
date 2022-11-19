const express = require('express')
const route = require('./router/router')
const app = express();
const mongoose = require('mongoose')

app.use(express.json())


mongoose.connect("mongodb+srv://FunctionUp-Cohort_Group5:qXSbWL3JrmHVlc4W@project-1.xd5zdfo.mongodb.net/project-1blogging?retryWrites=true&w=majority",{
    useNewUrlParser:true
 })
 
 .then(()=>console.log("mongoose is connected"))
 .catch(err=> console.log(err))

 app.use('/', route);

app.listen(process.env.port||3000, function(){
    console.log("express app running on port "+(process.env.port||3000))
})
