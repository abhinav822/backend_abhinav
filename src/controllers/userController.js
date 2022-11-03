const userModel= require("../models/userModel")

const createUser= async function (req, res) {

    let data=req.body
     let value = req.headers.isfreeappuser
    data.isFreeAppUser=value
     let savedData= await userModel.create(data) 
     res.send({data: savedData}) 
} 

module.exports.createUser= createUser