const express = require('express');
const router = express.Router();
const authorController = require("../controller/authorController")
const blogController = require("../controller/blogController")
const {authentication,authorize} = require("../middleware/auth")


router.post("/authors", authorController.createAuthor) //pratibha

router.post("/blogs",authentication, blogController.createBlog)  //me

router.get("/blogs",authentication,blogController.getBlogs)

router.put("/blogs/:blogId",authentication,authorize,blogController.updateBlog)  //me

router.delete("/blogs/:blogId",authentication,authorize,blogController.deleted)  //me

router.delete("/blogs",authentication, blogController.deleteByQuery)  //pratibha

router.post("/login", authorController.loginAuthor)  //pooja(loginauthor, authentication)



module.exports = router;






