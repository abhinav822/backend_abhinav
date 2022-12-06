const userModel = require("../models/userModel")
const valid = require("../validation/validation")
const jwt=require("jsonwebtoken")

const userCreation = async (req, res) => {

    try {
        let requestBody = req.body

        const { title, name, phone, email, password, address } = requestBody
        if (!valid.isValidRequestBody) {
            return res.status(400).send({ status: false, msg: "request body can't be Empty" })
        }
        if (!title) {
            return res.status(400).send({ status: false, msg: "title is Mandatory" })
        }
        
        if (!valid.isValidtitle(title)) {
            return res.status(400).send({ status: false, msg: "title should be MR,Mrs,Miss" })
        }
        if (!name) {
            return res.status(400).send({ status: false, msg: "Name is Mandatory" })
        }
       
        if (!valid.isValidName(name)) {
            return res.status(400).send({ status: false, msg: "invalid Name " })
        }
        if (!phone) {
            return res.status(400).send({ status: false, msg: "phone is Mandatory" })
        }
       
        if (!valid.validatePhone(phone)) {
            return res.status(400).send({ status: false, msg: "pls provide correct phone " })
        }

        const usedPhone = await userModel.findOne({ phone })
        if (usedPhone) {
            return res.status(400).send({ status: false, msg: " Phone is already register" })
        }

        if (!email) {
            return res.status(400).send({ status: false, msg: "email is mandatory" })
        }
       
        if (!valid.isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: "Invalid email id" })

        }
        const usedEmail = await userModel.findOne({ email })
        if (usedEmail) {
            return res.status(400).send({ status: false, msg: "Email is already register" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "password is Mandatory" })
        }
        if (!valid.isValidPassword(password)) {
            return res.status(400).send({ status: false, msg: " invalid password" })
        }
        if (!address) {
            return res.status(400).send({ status: false, msg: "address is Mandatory" })
        }
        if (!valid.isValidStreet(address.street)) {
            return res.status(400).send({ status: false, msg: " invalid  street name " })
        }
        if (!valid.isValidName(address.city)) {
            return res.status(400).send({ status: false, msg: " invalid city name " })
        }
        if (!valid.validPin(address.pincode)) {
            return res.status(400).send({ status: false, msg: " invalid  pincode " })
        }

        const createUser = await userModel.create(requestBody)
        return res.status(201).send({ status: true, msg: " user created successfully", data: createUser })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }

}



const userLogin =async (req,res)=>{


    try{
         
         let requestBody=req.body
         let {email,password}=requestBody
       
         if(!valid.isValidRequestBody(requestBody)){
            return res.status(400).send({ status: false, msg: "  request body can't be Empty" })
         }
       if(!email){
        return res.status(400).send({ status: false, msg: " email can't be Empty" })
       }
       if(!valid.isValidEmail(email)){
        return res.status(400).send({ status: false, msg: "Pls provide valid email" })
       }
       if(!password){
        return res.status(400).send({ status: false, msg: "password can't be Empty" })
       }
       if(!valid.isValidPassword(password)){
        return res.status(400).send({ status: false, msg: "Pls provide valid password" })
       }
       if(email && password){
        let checkAvailability = await userModel.findOne({email:email,password:password})
        if(checkAvailability){

            const payload = {"userId":checkAvailability['_id'].toString(),
            "Exp":Math.floor(Date.now()/1000)+(60*60),
            "iat":Math.floor(Date.now()/1000),
            
        }

            const jwttoken = jwt.sign(payload,"secret")

            let obj = {userId:payload.userId,iat:payload.iat,exp:payload.Exp,token:jwttoken}

            return res.status(200).send({status:true,data:obj})


        }else{
            return res.status(401).send({status:false,msg:"invalid credentials"})
        }
        
       }

    }  
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
    
    
    }





module.exports = { userCreation ,userLogin}