const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mid=require("../middleware/auth")


router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",mid.authenticate,mid.authorise, userController.getUserData)
router.put("/users/:userId",mid.authenticate, mid.authorise, userController.updateUser)
router.delete('/users/:userId',mid.authenticate, mid.authorise, userController.deleteUser)


module.exports = router; 