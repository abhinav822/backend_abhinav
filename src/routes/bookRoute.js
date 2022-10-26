const express = require("express");
const router = express.Router();

//require the controller
const bookController = require("../controllers/bookController");


// Create a new book
router.post("/create", bookController.createBook);

//bookList : gives all the books- their bookName and authorName only 

router.get("/list", bookController.bookList);

//getBooksInYear: takes year as input in post request and gives list of all books published that year

router.post("/year", bookController.getBooksInYear);

// getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition

router.post("/particular", bookController.getParticularBooks);

// getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR”

router.get("/inr", bookController.getXINRBooks);

// getRandomBooks - returns books that are available in stock or have more than 500 pages 

router.get("/random", bookController.getRandomBooks);
// Export the Router
module.exports = router;



