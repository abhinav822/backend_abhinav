const jwt = require("jsonwebtoken")
const bookModel = require("../models/bookModel")
const valid = require("../validation/validation")

const authentication = function (req, res, next) {  // in this authentication function we are checking the token is valid or not by using jwt.verify() method and 
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: " Token Required" })

        jwt.verify(token, "secret", function (err, decodedToken) {  // jwt.verify means it will verify the token and if it is valid then it will return the decoded token
            if (err) {
                return res.status(400).send({ status: false, msg: "Invalid Token or Token Expired" });
            } 
              req.decodedToken = decodedToken
                next() 
        })
        
        
    } catch (err) {
       
        res.status(500).send({ status: false, msg: err.message })
    }
}


const authorization = async (req, res, next) => {
    try {
        
            let token = req.headers["x-api-key"];
            let decodedToken = jwt.verify(token, "secret")
    
            let bookId = req.params.bookId
            if (bookId) {
    
             let userId = await bookModel.find({ _id: bookId }).select({ userId: 1, _id: 0 })
 
             let user = userId.map(x => x.userId)  // here we are getting the userId from the bookId
             
                let id = decodedToken.userId
                if (id != user) return res.status(403).send({ status: false, msg: "Not Authorized !!" })
            }
            else {
                let userID = req.body.userId
                if (!valid.isValidObjectId(userID)) {
                    return res.status(400).send({ status: false, msg: "invalid bookId" })
                }
                let ID = decodedToken.userId
                
    
                if (ID!= userID) return res.status(403).send({ status: false, msg: "Not Authorized !!" })
            }
    
            next();
    }    

    catch (err) {
        res.status(500).send({ status: false, error: err.message }) 
    }

}

// const authorization = async function (req, res, next) {
//     try {
//         let token = req.headers["x-api-key"];
//         let decodedtoken = jwt.verify(token, "secret")

//         let toBeupdatedbookId = req.params.bookId
//         if (toBeupdatedbookId) {

//             let updatinguserId = await bookModel.find({ _id: toBeupdatedbookId }).select({ userId: 1, _id: 0 })
//             let userId = updatinguserId.map(x => x.userId)

//             let id = decodedtoken.userId
//             if (id != userId) return res.status(403).send({ status: false, msg: "You are not authorised to perform this task" })
//         }
//         else {
//             toBeupdatedbookId = req.body.userId
//             let id = decodedtoken.userId
//             console.log(toBeupdatedbookId)

//             if (id != toBeupdatedbookId) return res.status(403).send({ status: false, msg: 'You are not authorised to perform this task' })
//         }

//         next();
//     }
//     catch (error) {
//         console.log(error)
//         return res.status(500).send({ msg: error.message })
//     }
// }


module.exports={authentication,authorization}


// how authentication works is that we are checking the token is valid or not by using jwt.verify() method and if it is valid then we are getting the decoded token and we are storing it in req.decodedToken and then we are calling next() method so that it will go to the next middleware function and if it is not valid then it will return the error message