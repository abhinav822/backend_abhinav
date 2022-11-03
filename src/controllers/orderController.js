const orderModel= require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const createOrder= async function (req, res) {

    let data=req.body
    let value = req.headers.isfreeappuser
    data.isFreeAppUser=value
    let userId= data.userId
    let productId=data.productId 
    if(!userId){
        return res.send({msg: "userid is mandatory"})
    }else if(!productId){
        return res.send({msg: "productId is mandatory"}) 
    } 

    let userid = await userModel.findById(data.userId)
    if(!userid){
        return res.send({msg: "userId is not valid"})
    }
    let productid= await productModel.findById(data.productId)
    if(!productid){
        return res.send({msg: "productId is not valid"})
    } 

    let num=0  // num is variable set to 0
    if(value== "true"){  // checking the value in req.headers.isfreeappuser
        data.amount=num  // if the user is free app user then the amount is 0
        let savedData=await orderModel.create(data)  // creating the order
        res.send({data: savedData})  // sending the response
    }
    else if(userid.balance>= productid.price){ // checking if the user has enough balance to buy the product
        await userModel.findOneAndUpdate({_id: userid}, // updating the balance of the user
            {$set:{balance:userid.balance - productid.price}})    
            data['amount']= productid.price;  // setting the amount to the price of the product
            data['isFreeAppUser']= req.headers.isfreeappuser;  // setting the isFreeAppUser to the value in req.headers.isfreeappuser

    
     let savedData= await orderModel.create(data)  // creating the order
     res.send({data: savedData}) // sending the response
    } else {
        return res.send({msg: "user have not enough balance"})
     }
    }

module.exports.createOrder= createOrder

// what we are doing here is that we are creating a new order and we are checking if the user is free app user or not
// if the user is free app user then we are not charging him and we are creating the order
// if the user is not free app user then we are checking if the user have enough balance to buy the product or not
// if the user have enough balance then we are creating the order and we are deducting the price of the product from the user balance
// if the user does not have enough balance then we are not creating the order and we are sending a message to the user that he does not have enough balance

// if the user is free app user then we are setting the amount to 0 and creating the order and property isFreeAppUser to true

//