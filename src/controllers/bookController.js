const express = require("express"),
Book = require("../model/bookSchema")



exports.createBook = async (req, res) => {  // in this line async means that this function will return a promise
    // create a new book
    const book = new Book({  // new Book means that we are creating a new instance of the Book model instance means that we are creating a new document in the Book collection
        bookname: req.body.bookname,  // req.body.bookname means that we are getting the bookname from the request body
        authorname: req.body.authorname,
        category: req.body.category,
        year: req.body.year,
    });
    // save the book
    try {
        const newBook = await book.save();  
        res.send({ message: "Book created successfully", newBook });
    } catch (err) {
        res.status(500).send({ message: err });
        console.log(err);
    }
};  


// get all the books

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (err) {
        res.status(500).send({ message: err });
        console.log(err);
    }
};



