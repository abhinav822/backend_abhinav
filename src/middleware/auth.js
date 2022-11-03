const jwt = require('jsonwebtoken');


const mid1 = function (req, res, next) {

   let token = req.headers["x-auth-token"];
   if (!token) {
      return res.send({ status: false, msg: "token must be present" });
   }
   let decodedToken = jwt.verify(token, "functionup-lithium-very-very-secret-key");
   if (decodedToken) {
      next();
   } else {
      return res.send({ status: false, message: 'Token is not valid' })
   }
}


module.exports.mid1 = mid1