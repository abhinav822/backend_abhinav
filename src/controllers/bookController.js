// Write create APIs for both books and authors ---> If author_id is not available then do not accept the entry(in neither the author collection nor the books collection)

const express = require("express"),
Book = require("../models/bookSchema")
Author = require("../models/authorSchema")


exports.createAuthor = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Author content can not be empty"
        });
    }

    // Create a Author
    const author = new Author(req.body);

    // Save Author in the database
    author.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Author."
        });
    });
}

//for books

exports.createBook = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }

    // Create a Book
    const book = new Book(req.body);

    // Save Book in the database
    book.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Book."
        });
    });
}

// List out the books written by "Chetan Bhagat" when we try to search with author_name "Chetan Bhagat" in the postman

exports.getBooksbyAuthor = (req, res) => {
    Author.find({author_name: req.body.author_name})
    .then(books => {  
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    });
}

// find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)


exports.getBooksAuthor = (req, res) => {
    Book.findOneAndUpdate({name: req.body.name}, {price: req.body.price})
    .then(books => {
        Author.find({author_id: books.author_id})
        .then(author => {
            res.send(author);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    }); 
}

   // find the book for particular condition of whatever we enter in postman so code is below

   exports.getParticularBooks = async (req, res) => {
    try {
        const books = await Book.find(req.body);
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};  
