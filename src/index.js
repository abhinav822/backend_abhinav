const express = require('express');
var bodyParser = require('body-parser');


const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

// to run loadash.js file in route.js file I have to import it but it is giving error
// so i can not run loadash.js file in route.js file to fix this what i can do is there any other way to run loadash.js file in route.js file steps are given below

// Path: src\index.js
// Compare this snippet from src\validator\loadash.js:
// const _ = require("lodash");
// 