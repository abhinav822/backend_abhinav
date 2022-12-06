const userModel = require("../models/userModel")
const bookModel = require("../models/bookModel")
const valid = require("../validation/validation")
const reviewModel = require("../models/reviewModel")


//================================book create==============================================================================

const bookCreation = async (req, res) => {

    try {
        let requestBody = req.body

        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt,bookcover } = requestBody
        if (!valid.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "request body can't be Empty" })
        }
        if (!valid.isValidRequestBody(bookcover)) {
            return res.status(400).send({ status: false, msg: "bookcover can't be Empty" })
        }

        if (!title) {
            return res.status(400).send({ status: false, msg: "title of book is mandatory " })
        }
        if (!valid.invalidInput(title)) {
            return res.status(400).send({ status: false, msg: "invalid title input" })
        }

        let usedTitle = await bookModel.findOne({ title })
        if (usedTitle) {
            return res.status(400).send({ status: false, msg: " title is already taken" })
        }

        if (!excerpt) {
            return res.status(400).send({ status: false, msg: "excerpt is mandatory" })
        }
        if (!valid.invalidInput(excerpt)) {
            return res.status(400).send({ status: false, msg: " pls provide excerpt for book" })

        }
        if (!userId) {
            return res.status(400).send({ status: false, msg: "userId is mandatory" })
        }

        if (!valid.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, msg: "pls provide valid userID" })
        }
        let checkUserId = await userModel.findById({_id: userId })
        if (!checkUserId) {
            return res.status(400).send({ status: false, msg: " userId doesn't exist" })
        }

        if (!ISBN) {
            return res.status(400).send({ status: false, msg: "ISBN is mandatory" })
        }
        if (!valid.validateISBN(ISBN)) {
            return res.status(400).send({ status: false, msg: " Invalid ISBN  format" })
        }
        let usedISBN = await bookModel.findOne({ ISBN })

        if (usedISBN) {
            return res.status(400).send({ status: false, msg: " ISBN is already used" })
        }
        if (!category) {
            return res.status(400).send({ status: false, msg: "Category is mandatory " })
        }
        if (!valid.isValidName(category)) {
            return res.status(400).send({ status: false, msg: "Invalid category " })
        }
        if (!subcategory) {
            return res.status(400).send({ status: false, msg: "subcategory is mandatory " })
        }
        if (!valid.invalidInput(subcategory)) {
            return res.status(400).send({ status: false, msg: "Invlid subcategory " })
        }
        if (!releasedAt) {
            return res.status(400).send({ status: false, msg: "releasedAt is mandatory " })
        }
  
        if (!valid.date(releasedAt)) {
            return res.status(400).send({ status: false, msg: " Released Date should be in format of YYYY-MM-YY " })
        }

const bookDetails = await bookModel.create(requestBody)
  return res.status(201).send({status:false,msg:"book created successfully",data:bookDetails})
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


//===================================get book by query=========================================================

const getBooksQuery = async (req, res) => {
    try {
        const reqBody = req.query;
        const { userId, category, subcategory } = reqBody

        if ((Object.keys(reqBody).length === 0) || (userId || category || subcategory)) {
            if (reqBody.userId) {


                if (!valid.isValidObjectId(userId)) {
                    return res.status(400).send({ status: false, msg: "pls provide valid userID" })
                }
                let checkUserId = await userModel.findById({ _id: userId })
                if (!checkUserId) {
                    return res.status(404).send({ status: false, msg: " userId doesn't exist" })
                }
            }
            //-------------------------------book finding----------------------------
            const books = await bookModel.find({ $and: [{ isDeleted: false }, reqBody] }).select({
                title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1, subcategory: 1
            }).collation({ locale: "en" }).sort({ title: 1 }); //collation is mongoDB method to sort the data in ascending order locale means language

            if (books.length === 0)
                return res.status(404).send({ status: false, message: 'Book is not found.' });

            return res.status(200).send({ status: true, message: 'Books list', count: books.length, data: books });

        } else
            return res.status(400).send({ status: false, message: 'Invalid query' });

    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};

//===============================get book by id====================================================================

const bookById = async function (req, res) {

    try {

        const reqBookId = req.params.bookId

        if (!valid.invalidInput(reqBookId)) {
            return res.status(400).send({ status: false, msg: "pls provide bookId" })
        }
        if (!valid.isValidObjectId(reqBookId)) {
            return res.status(400).send({ status: false, msg: "invalid bookId" })
        }
        let bookInfo = await bookModel.findOne({ _id: reqBookId, isDeleted: false })
        if (!bookInfo) {
            return res.status(404).send({ status: false, msg: "book not found" })
        }

        let reviewData = await reviewModel.find({ bookId: reqBookId, isDeleted: false }).select({ deletedAt: 0 })
        const responseData = bookInfo.toObject()
        responseData.reviews = reviewData

        return res.status(200).send({ status: true, msg: "book data successfull", data: responseData })




    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//================================update book api==========================================================

const updateBook = async function (req, res) {

    try {
        const requestBody = req.body
        const reqBook = req.params.bookId

        if (!valid.invalidInput(reqBook)) {
            return res.status(400).send({ status: false, msg: "pls provide bookId" })
        }
        if (!valid.isValidObjectId(reqBook)) {
            return res.status(400).send({ status: false, msg: "invalid bookId" })
        }
        if (reqBook) {
            const checkId = await bookModel.findOne({ _id: reqBook })
            if (!checkId)
                return res.status(404).send({ status: false, msg: "book Id not found" })
        }

        let { title, excerpt, releasedAt, ISBN } = requestBody

        if (!title) {
            return res.status(400).send({ status: false, msg: "title of book is mandatory " })
        }
        if (!valid.invalidInput(title)) {
            return res.status(400).send({ status: false, msg: "invalid title input" })
        }

        let usedTitle = await bookModel.findOne({ title })
        if (usedTitle) {
            return res.status(400).send({ status: false, msg: " title is already taken" })
        }

        if (!excerpt) {
            return res.status(400).send({ status: false, msg: "excerpt is mandatory" })
        }
        if (!valid.invalidInput(excerpt)) {
            return res.status(400).send({ status: false, msg: " pls provide excerpt for book" })

        }
        if (!ISBN) {
            return res.status(400).send({ status: false, msg: "ISBN is mandatory" })
        }
        if (!valid.validateISBN(ISBN)) {
            return res.status(400).send({ status: false, msg: " Invalid ISBN  format" })
        }
        let usedISBN = await bookModel.findOne({ ISBN })

        if (usedISBN) {
            return res.status(400).send({ status: false, msg: " ISBN is already used" })
        }
        if (!releasedAt) {
            return res.status(400).send({ status: false, msg: "releasedAt is mandatory " })
        }
        if (!valid.invalidInput(releasedAt)) {
            return res.status(400).send({ status: false, msg: "date should be in YYYY-MM-YY " })
        }

        const findBook = await bookModel.findOne({ _id: reqBook, isDeleted: false })  // this line means that if book is deleted then it will not update the book

        if (findBook) {
            const updating = await bookModel.findOneAndUpdate({ _id: reqBook, isDeleted: false },
                { title: title, excerpt: excerpt, releasedAt: releasedAt, ISBN: ISBN }, { new: true }).select({ deletedAt: 0 }) // 
            return res.status(200).send({ status: true, msg: "book updated successfully", data: updating })
        } else {
            return res.status(400).send({ status: false, msg: "book is already deleted" })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.msg })
    }
}

//========================================delete book api=======================================================
const bookDeletion = async function (req, res) {
    try {

        const bookId = req.params.bookId


        if (!valid.invalidInput(bookId)) {
            return res.status(400).send({ status: false, msg: "pls provide bookId" })
        }
        if (!valid.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "invalid bookId" })
        }

        if (bookId) {
            const check = await bookModel.findOne({ _id: bookId, isDeleted: false })
            if (!check)
                return res.status(404).send({ status: false, msg: "book already deleted" })

        }
        let deleteBook = await bookModel.findByIdAndUpdate({ _id: bookId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        return res.status(200).send({ status: false, msg: "book deleted successfull", data: deleteBook })

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { bookCreation, getBooksQuery, bookById, updateBook, bookDeletion }
