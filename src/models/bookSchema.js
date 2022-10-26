/// Create a books collection in your DB ( using bookModel with following fields)- bookName( mandatory field), price containing Indian and european price, year ( should be 2021 if no year is provided) , tags array, authorName, totalPages , stockAvailable ( true false)
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true,
    },
    price: {
        indian: {
            type: String,
            required: true,
        },
        euro: {
            type: String,
            required: true,
        },
    },
    year: {
        type: Number,

        default: 2021,
    },
    tags: [String],
    authorname: {
        type: String,
        required: true,
    },
    totalpages: {
        type: Number,
        required: true,
    },
    stockavailable: {
        type: Boolean,
        required: true,
    },
});


const Book = mongoose.model('Book', bookSchema);

// Export the Book model
module.exports = Book;

