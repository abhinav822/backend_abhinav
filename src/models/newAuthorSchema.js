
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    authorname: String,
    age: Number,
    address: String,
    rating: Number,
});

module.exports = mongoose.model('newAuthor', authorSchema)

// Create at least 6 authors with ratings 2, 3, 3.5, 4, 4.5 and 5 so 6 authors are as follows:

// 1. Chetan Bhagat, 50, New Delhi, 2
// 2. J K Rowling, 60, London, 3
// 3. Dan Brown, 70, New York, 3.5
// 4. Stephen King, 80, Maine, 4
// 5. Agatha Christie, 90, sydney, 4.5
// 6. Sidney Sheldon, 100, New York, 5

// publishers are as follows:

// 1. Penguin, New Delhi
// 2. Bloomsbury, mumbai
// 3. HarperCollins, akola
// 4. Saraswati House, chennai

// 10 books are as follows with the author and publisher details in api format for postman data 

// 1. 2 States, Chetan Bhagat, Penguin
// 2. Harry Potter, J K Rowling, Bloomsbury
// 3. Inferno, Dan Brown, HarperCollins
// 4. The Shining, Stephen King, Saraswati House



