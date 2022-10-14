const _ = require('loadash');
const express = require('express');
const router = express.Router();///test-you

const xyz = require('../logger')
const helper = require('../util/helper')
const formatter = require('../validator/formatter')
const lodash = require('../loadash/loadash')
// const underscore = require('underscore')

router.get('/test-me', function (req, res) {
    //Calling the components of a different custom module
    console.log("Calling my function ",xyz.myFunction())
    console.log("The value of the constant is ",xyz.myUrl)
    //Trying to use an external package called underscore
    let myArray = ['Akash', 'Pritesh', 'Sabiha']
    let result = underscore.first(myArray)
    console.log("The result of underscores examples api is : ", result)
    res.send('My first ever api!')
    
    xyz.welcome()
    helper()
    formatter()
    lodash()
    


});


module.exports = router;




