const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");
// require("dotenv").config();


const createUser = async function (req, res) {
  
  let data = req.body;
  let savedData = await userModel.create(data); 
  console.log(req.newAtribute);
  res.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({ 
      status: false,
      msg: "username or the password is not corerct",
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),  
      // batch: "lithium",
      // organisation: "FunctionUp",
      // month: "August",     
    },
    "functionup-plutonium-very-very-secret-key" // This is the secret key
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token });
 
};





const getUserData = async function (req, res) {
  let token = req.headers["x-auth-token"]; 
  // console.log(token);  

  let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
  if (!decodedToken)
   return res.send({ status: false, msg: "token is invalid" });
  console.log(decodedToken); 

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" }); 

  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
 
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.send({  updatedUser }); 
}; ; 

const deleteUser = async function (req, res) {
  let userId = req.params.userId;
  let deleteUser = await userModel.findOneAndUpdate({ _id: userId }, {$set: {isDeleted: true}},{new:true});
  return res.send({ status:true, Data: deleteUser });  
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;