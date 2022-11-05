const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const createUser = async function (req, res) {
  const salt = await bcryptjs.genSalt(20);
    const hashedPassword = await (req.body.password.toString(), salt);
  try {
    let data = req.body;
    data.password = hashedPassword;
    let savedData = await userModel.create(data);
    // console.log(req.newAtribute);
    return res.status(201).send({ msg: savedData });

  } catch (error) { return res.status(500).send({ msg: "SERVER ISSUE" }) }


};

//write create user function here with hash password and save it in database so code will be like this




const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      // console.log(user);
      return res.status(404).send({
        status: false,
        msg: "username or the password is not corerct",
      });

    let token = jwt.sign(
      {
        userId: user._id.toString(),
      
      },
      "functionup-lithium-very-very-secret-key"
    );
    res.setHeader("x-auth-token", token); // if we comment this line then the token will not be sent to the client
    res.status(200).send({ status: true, data: token });

  } catch (error) {
    return res.status(500).send({ msg: "SERVER ISSUE" })

  }

}; // i want to see the current logged in user details in the console

const getUserData = async function (req, res) {

  try {

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(404).send({ status: false, msg: "No such user exists" });

    res.status(200).send({ status: true, data: userDetails });
  } catch (error) {
    return res.status(500).send({ msg: "SERVER ISSUE" })

  }

};

const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("No such user exists");
    }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
    res.status(200).send({ status: updatedUser, data: updatedUser });

  } catch (error) {
    return res.status(403).send({ msg: "ACCESS DENIED" })  // status code for access denied is 403
  }

};


const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).send({ status: false, message: "no such user exists" })
    }
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true })
    res.status(200).send({ status: true, data: updatedUser })

  } catch (error) {
    return res.status(500).send({ msg: "SERVER ISSUE" })

  }

}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser

// how the login controller works is that it takes the username and password from the request body and then it searches the database for the user with the same username and password. If the user is found then it generates a token and sends it to the client. The token is sent to the client in the header of the response. The client then stores the token in the local storage and sends it to the server in the header of the request. The server then verifies the token and if it is valid then it allows the user to access the protected routes. If the token is invalid then the server sends a 401 status code to the client. The client then redirects the user to the login page.