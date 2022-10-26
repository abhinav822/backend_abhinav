const express = require("express"),
Book = require("../models/bookSchema")



// createBook : to create a new entry..use this api to create 11+ entries in your collection

exports.createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};


//bookList : gives all the books- their bookName and authorName only 

exports.bookList = async (req, res) => {
    try {
        const books = await Book.find({}, { bookname: 1, authorname: 1 });
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};

//getBooksInYear: takes year as input in post request and gives list of all books published that year

exports.getBooksInYear = async (req, res) => {
    try {
        const books = await Book.find({ year: req.body.year });
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};


// take any condition as input and use it as a condition to fetch books that satisfy that condition and it should fetch data for price, year, tags, authorName, totalPages , stockAvailable code is below


exports.getParticularBooks = async (req, res) => {
    try {
        const books = await Book.find(req.body);
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};  




// getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR” 

exports.getXINRBooks = async (req, res) => {
    try {
        const books = await Book.find({ "price.indian": { $in: ["100INR", "200INR", "500INR"] } });
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};


// getRandomBooks - returns books that are available in stock or have more than 500 pages 

exports.getRandomBooks = async (req, res) => {
    try {
        const books = await Book.find({ $or: [{ stockavailable: true }, { totalpages: { $gt: 500 } 
}] });
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};


