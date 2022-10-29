const newBookSchema = require("../models/newBookSchema.js")
const newAuthorSchema = require("../models/newAuthorSchema.js")
const newPublisherSchema = require("../models/newPublisherSchema.js")

// 3. Write a POST api that creates a book from the details in the request body. The api takes both the author and publisher from the request body. 
// In this api, you have to write a logic that validates the following :

// The authorId is present in the request body. If absent send an error message that this detail is required
// If present, make sure the authorId is a valid ObjectId in the author collection. If not then send an error message that the author is not present.
// The publisherId is present in the request body. If absent send an error message that this detail is required
// // If present, make sure the publisherId is a valid ObjectId in the publisher collection. If not then send an error message that the publisher is not present.


// for these schemas the above code can be written as below

exports.createBook = async function (req, res) {
    try {
        let book = req.body
        let authorid = book.author
        if (!authorid) {
            return res.send({ status: false, msg: "that this detail is required" })
        }
        let author = await newAuthorSchema.findById(book.author)
        if (!author) {
            return res.send({status: false, msg: "Author id is not valid"})
        }
        let authorid1 = book.publisher
        if (!authorid1) {
            return res.send({ status: false, msg: "that this detail is required" })
        }
        let publisher = await newPublisherSchema.findById(book.publisher)
        if(!publisher) {
            return res.status(400).send({msg: "Publisher id is not valid"})
        } 

        let bookCreated = await newBookSchema.create(book)
        res.send({ data: bookCreated })
    } catch (error) {
        res.send({ error: error.message })
    }
}

// Write a GET api that fetches all the books along with their author details (you have to populate for this) as well the publisher details (you have to populate for this) 

exports.getBooks = async function (req, res) {
    try {
        let books = await newBookSchema.find().populate("author publisher") //poulate method in mongoose is used to get the details of the author from the newAuthor collection
        res.send({ data: books })
    } catch (error) {
        res.send({ error: error.message })
    }
}  

// Create a new PUT api /books and perform the following two operations
//  a) Add a new boolean attribute in the book schema called isHardCover with a default false value. For the books published by 'Penguin' and 'HarperCollins', update this key to true.
//  b) For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60) 

exports.updateBooks = async function (req, res) {
    try {
        let books = await newBookSchema.find().populate("author publisher")
        for (let book of books) { 
            if (book.publisher.name === "Penguin" || book.publisher.name === "harpercollins") {
                book.isHardCover = true
            }
            if (book.author.rating > 3.5) {  // in postman body i will wtite the rating of the author
                book.price = book.price + 10
            }
            await book.save()
        }
        res.send({ data: books})
    } catch (error) {
        res.send({ error: error.message })
    }
}
// I want only those books whose price is updated to be displayed in response body. How can I do that we can use filter method to do that and code will be like this
