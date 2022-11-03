const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mid=require("../middleware/auth")


router.post("/users", userController.createUser )

router.post("/login", userController.loginUser)

// The userId is sent by front end
router.get("/users/:userId",mid.mid1, userController.getUserData)

router.put("/users/:userId",mid.mid1,  userController.updateUser)

router.delete("/deleteuser/user/:userId",mid.mid1, userController.deleteUser)

module.exports = router; 

