const express = require("express");
const router = express.Router();

//require the controller
const bookController = require("../controllers/bookController");


// Create a new book
router.post("/create", bookController.createBook);

// Get all books
router.get("/getall", bookController.getAllBooks);

// Export the Router
module.exports = router;



