// Create a bookSchema with bookName, authorName, category and year

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookname: { type: String, required: true },
    authorname: { type: String, required: true },
    category: { type: String, required: true },
    year: { type: Number, required: true },
});

const Book = mongoose.model('Book', bookSchema); // definition of model in mongodb is a collection of documents

// Export the Book model
module.exports = Book;

