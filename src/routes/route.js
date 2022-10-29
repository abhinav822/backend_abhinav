const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController= require("../controllers/publisherController")


router.post("/createauthor", authorController.createAuthor)

router.post("/createpublish", publisherController.createPublisher)

router.post("/createbook", bookController.createBook)

router.get("/getbooks", bookController.getBooks)

router.put("/updatebook", bookController.updateBooks)
module.exports = router;