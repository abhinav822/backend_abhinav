
const express = require('express');
const router = express.Router();

const bookController = require("../controllers/bookController");

router.post("/createbook", bookController.createBook);

router.post("/createauthor", bookController.createAuthor);

router.post("/getbooksauthor", bookController.getBooksbyAuthor);

router.get("/getbook", bookController.getParticularBooks);


module.exports = router;
