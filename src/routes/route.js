const express = require('express');
const router = express.Router();

 
let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]

   //Write a POST /players api that creates a new player ( i.e. that saves a player’s details and doesn’t allow saving the data of a player with a name that already exists in the data)

router.post('/players', (req, res) => {
    let player = req.body;
    let playerExists = players.find(p => p.name === player.name);  // p.name 
    if (playerExists) {
        res.status(400).send('Player already exists');
    } else {
        players.push(player);
        res.send(player);
    }
});

router.get('/getplayers',(req,res)=>{
    res.send(players);
})



 

module.exports = router;