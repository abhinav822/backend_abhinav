const reviewModel = require('../models/reviewModel')
const bookModel = require('../models/bookModel')
const valid = require('../validation/validation')


const createReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!valid.isValidObjectId(bookId))
            return res.status(400).send({ status: false, msg: " please provide valid bookId" })

        let checkId = await bookModel.findById(bookId)
        if (!checkId) return res.status(404).send({ status: false, msg: "book not found" })
        if (checkId.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "book is already deleted" })
        }
        let data = req.body
        let { reviewedBy, reviewedAt, rating, isDeleted, review } = data

        let Obj = {}

        if (!valid.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "please provide some data to create review" })
        }
        Obj.bookId = bookId  // obj.bookId = bookId this line means that the bookId is the bookId of the book which is being reviewed


        if (reviewedBy) {
            if (!valid.invalidInput(reviewedBy)) {
                return res.status(400).send({ status: false, msg: "reviewers name is in proper format" })
            }
            if (!valid.isValidName(reviewedBy))
                return res.status(400).send({ status: false, msg: "reviewers name is invalid" })

            Obj.reviewedBy = reviewedBy
        } else {
            Obj.reviewedBy = "Guest"
        }

        if (!reviewedAt) {
            Obj.reviewedAt = Date.now()
        }
        if (!rating) {
            return res.status(400).send({ status: false, msg: "rating is required" })
        }
        if (rating) {

            if (!(typeof rating === "number")) {
                return res.status(400).send({ status: false, msg: "rating should be a number" })
            }
            if (!valid.onlyNumbers(rating))
                return res.status(400).send({ status: false, msg: "rating should be between 1 to 5" })
        }


        Obj.rating = rating

        if (!valid.invalidInput(review)) {
            return res.status(400).send({ status: false, msg: "Pls provide valid input for review" })
        }
        Obj.review = review

        if (isDeleted == true) {
            return res.status(400).send({ status: false, msg: "Already deleted" })
        }
        Obj.isDeleted = isDeleted
        const reviewCreate = await reviewModel.create(Obj)

        const addCount = await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: 1 } }, { new: true }).select({ deletedAt: 0 })
        return res.status(201).send({ status: true, msg: "review is successfully done", data: addCount, reviewCreate })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}

// -------------------------------------------------------------------------------------------------------------------------------------------------- 

const updateReview = async function (req, res) {
    try {
        const bookId = req.params.bookId;
        const reviewId = req.params.reviewId
        const data = req.body
        const { review, rating, reviewedBy } = data;


        if (!valid.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "userId not valid" })
        }
        if (!valid.isValidObjectId(reviewId)) {
            return res.status(400).send({ status: false, msg: " reviewId not valid" })
        }
        if (!valid.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "please provide some data to update review" })
        }

        let Obj1 = {}


        if (reviewedBy) {
            if (!valid.invalidInput(reviewedBy)) {
                return res.status(400).send({ status: false, msg: "reviewers name is in proper format" })
            }
            if (!valid.isValidName(reviewedBy))
                return res.status(400).send({ status: false, msg: "reviewers name is invalid" })

            Obj1.reviewedBy = reviewedBy
        } else {
            Obj1.reviewedBy = "Guest"
        }


        if (!rating) {
            return res.status(400).send({ status: false, msg: "rating is required" })
        }
        if (rating) {

            if (!(typeof rating === "number")) {
                return res.status(400).send({ status: false, msg: "rating should be a number" })
            }
            if (!valid.onlyNumbers(rating))
                return res.status(400).send({ status: false, msg: "rating should be between 1 to 5" })
        }


        Obj1.rating = rating

        if (!valid.invalidInput(review)) {
            return res.status(400).send({ status: false, msg: "Pls provide valid input for review" })
        }
        Obj1.review = review


        const findBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!findBook) {
            return res.status(404).send({ status: false, msg: " book not found" })
        }
        const findReview = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
        if (!findReview) {
            return res.status(404).send({ status: false, msg: "review does not exist" })
        }
        if (findReview.bookId != bookId) {
            return res.status(404).send({ status: false, message: "Review not found for this book" })
        }

        const updatedReviews = await reviewModel.findOneAndUpdate({ _id: reviewId, isDeleted: false }, { $set: Obj1 }, { new: true }).select({ deletedAt: 0 })
        return res.status(200).send({ status: true, message: "Successfully updated the review of the book.", data: findBook, updatedReviews })


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// =-----===============================================================================================================

const deleteReview = async function (req, res) {
    try {

        let bookId = req.params.bookId;

        if (!valid.isValidObjectId(bookId))
            return res.status(400).send({ status: false, message: "Please enter valid bookId...!" })

        const bookExist = await bookModel.findOne({ _id: bookId, isDeleted: false }).select({ deletedAt: 0 })  // de

        if (!bookExist)
            return res.status(404).send({ status: false, message: "No such book found...!" });


        let reviewId = req.params.reviewId;

        if (!valid.isValidObjectId(reviewId))
            return res.status(400).send({ status: false, message: "enter valid reviewId...!" })


        const reviewExist = await reviewModel.findOne({ _id: reviewId, bookId: bookId })  // this line means that reviewId should be present in the bookId

        if (!reviewExist) return res.status(404).send({ status: false, message: "review not found...!" })



        if (reviewExist.isDeleted == true)
            return res.status(404).send({ status: false, data: "review is already deleted...!" })
        if (reviewExist.isDeleted == false) {



            await reviewModel.findOneAndUpdate(
                { _id: reviewId, bookId: bookId, isDeleted: false },  // 
                { $set: { isDeleted: true } },
                { new: true }
            );

            const addCount = await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } }, { new: true })

            return res.status(200).send({ status: true, msg: 'successfully deleted review' });
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }
}

module.exports = { createReview, updateReview, deleteReview }

