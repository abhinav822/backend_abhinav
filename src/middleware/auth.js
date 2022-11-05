const jwt = require("jsonwebtoken");


const authenticate = function (req, res, next) {
   
   try {
      let token = req.headers["x-Auth-token"];
      if (!token) token = req.headers["x-auth-token"];
      if (!token) return res.status(401).send({ status: false, msg: "token must be present" });

      //  console.log(token);  

      let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
      if (!decodedToken) {
         return res.status(403).send({ status: false, msg: "token is invalid" });
      }
      req.userLoggedIn = decodedToken.userId  // req.userLoggedIn is used to store the userId of the user who is logged in but why use req.userLoggedIn and not decodedToken.userId directly because we can use req.userLoggedIn in other functions as well req means
      next();
   } catch (error) {
      return res.status(500).send({ msg: "SERVER ISSUE" })

   }



}


const authorise = function (req, res, next) {  // this authorise function is used to check if the user is authorised to update or delete the data
   try {
      let requestUserId = req.params.userId
      if (requestUserId != req.userLoggedIn) {
         return res.status(403).send({ msg:"ACCESS DENIED" })
      }
      next()

   } catch (error) {
      return res.status(500).send({ msg: "ACCESS DENIED" })

   }

} 

module.exports.authenticate = authenticate
module.exports.authorise = authorise


// how the authenticate controller works is that it checks if the token is present in the header or not if it is not present then it sends a response with status code 401 which means unauthorised and if it is present then it verifies the token and if the token is invalid then it sends a response with status code 403 which means forbidden and if the token is valid then it stores the userId of the user who is logged in in req.userLoggedIn and then it calls the next function which is the authorise function and the authorise function checks if the userId of the user who is logged in is same as the userId of the user whose data is being updated or deleted and if it is not same then it sends a response with status code 403 which means forbidden and if it is same then it calls the next function which is the getUserData function or the updateUser function or the deleteUser function and then the getUserData function or the updateUser function or the deleteUser function is called and the data is sent to the client


