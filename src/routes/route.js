const express = require('express');
const router = express.Router(); 

let movies= ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']

// Create an API for GET /movies that returns a list of movies. Define an array of movies in your code and return the value in response.
router.get('/movies',(req,res)=>{
    res.send(movies)
})

//Create an API GET /movies/:indexNumber (For example GET /movies/1 is a valid request and it should return the movie in your array at index 1). You can define an array of movies again in your api

router.get('/movies/:indexNumber',(req,res)=>{
    let index = req.params.indexNumber  // req.params in browser can be seen in the option  
    res.send(movies[index])
})

// Handle a scenario in problem 2 where if the index is greater than the valid maximum value a message is returned that tells the user to use a valid index in an error message.
router.get('/movies/:indexNumber',(req,res)=>{
    let index = req.params.indexNumber //this line means
    if(index>movies.length){
        res.send('Please use a valid index')
    }
    else{
        res.send(movies[index])  
    }
})

let films=[ {
    'id': 1,
    'name': 'The Shining'
   }, {
    'id': 2,
    'name': 'Incendies'
   }, {
    'id': 3,
    'name': 'Rang de Basanti'
   }, {
    'id': 4,
    'name': 'Finding Nem'
   }]
   
   //Write another api called GET /films. Instead of an array of strings define an array of movie objects this time.

router.get('/films',(req,res)=>{
    res.send(films)
})


router.get('/films/:filmid',(req,res)=>{
    let filmid = req.params.filmid
    if (filmid>films.length){
        res.send('Please use a valid index')
    }
    else{
        res.send(films[filmid-1])
    }
})
   
module.exports = router;