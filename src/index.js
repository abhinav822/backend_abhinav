const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
//require moment
const moment = require('moment');
const app = express();

app.use(loggingMiddleware);
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/Pritesh8769811-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        next();
  }
  );

  
  // function loggingMiddleware(req, res, next) {
  //   console.log(`${new Date().toISOString()}: ${req.originalUrl} : ${req.ip}`)  // $ is used to access the variable inside the string 
  //   next()
  // }

function loggingMiddleware(req, res, next) {
  console.log(`${moment().format('DD-MM-YYYY, h:mm:ss a')}: ${req.originalUrl} : ${req.ip}`)}  // $ is used to access the variable inside the string like ${req.ip}  

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


// get current date and time in js we can use moment.js library or without using any library we can get current date and time in js using Date() object like below

// const today = new Date();
