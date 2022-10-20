const express = require('express');
const router = express.Router();

// you will be given an array of persons ( i.e an array of objects )..each person will have  a {name: String , age: Number, votingStatus: true/false(Boolean)}
// take input in query param as votingAge..and for all the people above that age, change votingStatus as true
// also return an array consisting of only the person that can vote

// WRITE A POST API TO THE ABOVE

// code is below



let persons= [
   {
   name: "PK",
   age: 10,
   votingStatus: false
},
{
   name: "SK",
   age: 20,
   votingStatus: false
},
{
   name: "AA",
   age: 70,
   votingStatus: false
},
{
   name: "SC",
   age: 5,
   votingStatus: false
},
{
   name: "HO",
   age: 40,
   votingStatus: false
}
]


// above can be done in a single line using map function
// router.post('/voting', (req, res) => {
//    let votingAge = req.query.votingAge;
//    let canVote = persons.map((person) => {
//       if (person.age >= votingAge) {
//          person.votingStatus = true;
//          return person;
//       }
//    });
//    res.send({newList: persons, canVote: canVote});
// });
// output is returning null value for canVote array as it is not returning anything for the persons whose age is less than votingAge so to fix this we can use filter function

// using for each loop

router.post('/voting', (req, res) => {
   let votingAge = req.query.age;
   let eligibleVoter = [];
   persons.forEach((person) => {
      if (person.age >= votingAge) {
         person.votingStatus = true;
         eligibleVoter.push(person);
      }
   });
   res.send({newList: persons, canVote: eligibleVoter});
});





 




module.exports = router;