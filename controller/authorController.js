const authorModel = require("../model/authorModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const saltRounds = 10;
//============================================= Register Author ==================================================================


const isValid = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === "undefined" || value === null) return false
    return true;
};

// ===title should be one of the following constants ===
const isValidTitle = function (title) {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}

const isValidName = function (name) {
    return /^[A-Za-z\s]{1,15}$/
    .test(name)

}


//create a author

exports.createAuthor = async function (req, res) {
    try {
        let data = req.body;

        let { fname, lname, title, email, password } = data
        if (Object.keys(data).length === 0)     //request body should not empty
            return res.status(400).send({ status: false, message: "please enter details" });

        if (!isValid(fname))
            return res.status(400).send({ status: false, message: "please enter first name" });

        if (!isValidName(fname))
            return res.status(400).send({ status: false, message: "please provide valid first name It should be in Alphabet format" });

        if (!isValid(lname))
            return res.status(400).send({ status: false, message: "please enter last name" });

        if (!isValidName(lname))
            return res.status(400).send({ status: false, message: "please enter valid last name It should be in Alphabet format" });

        if (!isValid(title))
            return res.status(400).send({ status: false, message: "please enter title" });

        if (!isValidTitle(title))
            return res.status(400).send({ status: false, message: "please enter valid title" });
        
        if (!isValid(email))
            return res.status(400).send({ status: false, message: "please enter email address" });

        if (!/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/.test(email))
            return res.status(400).send({ status: false, message: "please enter valid email" });


        const checkusedEmail = await authorModel.findOne({ email: data.email });
        if (checkusedEmail) {                                                             //check if emaild not already in used
            return res.status(400).send({ status: false, message: "email already used" });
        }

        if (!isValid(password))
            return res.status(400).send({ status: false, message: "please enter password" });

        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password))

            return res.status(400).send({ status: false, message: "Use any special character and Numbers password" });

        const salt = await bcrypt.genSalt(saltRounds)
        const hashPassword = await bcrypt.hash(data.password, salt)
        req.body["password"] = hashPassword


        let savedData = await authorModel.create(data)
        return res.status(201).send({ status: true, message: "Author has been created successfully ", data: savedData })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

/*===================================================LoginAuthor========================================================= */

// ============> Author Login Api <====================  
exports.loginAuthor = async (req, res) => {
    try {
        email = req.body.email;
        password = req.body.password;

        //===============================================user email  id is requires=============================================      
        if (!email) return res.status(400).send({ status: false, msg: "email id is required" })

        //==============================================  Password is required ==================================================     
        if (!password) return res.status(400).send({ status: false, msg: "Password is required" })

        //==============================================checking the email id or password is exist or not ============================      
        let getUser = await authorModel.findOne({ email: email }).select({ password: 1 })

        //============================================  User not found===========================================================     
        if (Object.keys(getUser).length == 0) return res.status(404).send({ status: false, msg: "User not found" })

        //========================================password matching by bcrypt.compare method password comeparing ===================================       
        const matchPassword = await bcrypt.compare(password, getUser.password)
        if (!matchPassword) return res.status(401).send({ status: false, msg: "Password is incorrect" })

        let token;
        try {
            token = jwt.sign({        //jwt.sign to creating the token 
                authorId: getUser._id.toString(),
                developer: "lithium Group5"      //   payload
            }, "functionUp-project1");         // signature key
        } catch (err) {
            return res.status(400).send({ status: false, msg: "Error", error: err.message })
        }

        //   =======================================================setHeader with some information =========================
        res.setHeader("x-api-key", token);
        return res.status(201).send({ status: true, msg: "User login sucessful", token })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}



