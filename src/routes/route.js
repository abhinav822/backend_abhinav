const express =require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require('../controllers/reviewController')
const { authentication, authorization } = require('../middleware/auth')
const aws = require('../aws/awsConfig')

router.post('/write-file', aws.awsrequest)

router.post("/register",userController.userCreation)

router.post("/login",userController.userLogin)

router.post("/books",authentication,authorization,bookController.bookCreation)

router.get("/books",bookController.getBooksQuery)

router.get("/books/:bookId",bookController.bookById)

router.put("/books/:bookId",authentication,authorization,bookController.updateBook)

router.delete("/books/:bookId",authentication,authorization,bookController.bookDeletion)

router.post("/books/:bookId/review", reviewController.createReview)

router.put("/books/:bookId/review/:reviewId", reviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)

router.all("/*", async function (req, res) {
    return res.status(404).send({ status: false, message: "Page Not Found" });
  });


module.exports = router


   
