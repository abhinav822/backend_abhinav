const express = require('express');
const router = express.Router();
const commonMW = require ("../middlewares/commonMiddlewares")
const UserController= require("../controllers/userController")
const OrderController = require("../controllers/orderController")
const Productcontroller= require("../controllers/productController")



// assignment

 router.post("/createproduct",Productcontroller.createProduct)

// 
 router.post("/createorder",commonMW.mid1, OrderController.createOrder)

//
router.post("/createuser",commonMW.mid1, UserController.createUser)


module.exports = router;