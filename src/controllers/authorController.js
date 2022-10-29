const newAuthorSchema = require("../models/newAuthorSchema.js")

// 1. Write a POST api that creates an author from the details in request body using try catch block
exports.createAuthor = async function (req, res) {
    try {
        let author = req.body
        let authorCreated = await newAuthorSchema.create(author)  // create is a mongoose method that creates a new document in the collection
        res.send({data: authorCreated})
    } catch (error) {
        res.send({error: error.message})
    }
}