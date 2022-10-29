const mongoose = require('mongoose');

// A newBook document should look like this. The author property is a reference to newAuthor collection. 
// {
// 		_id: ObjectId("61951bfa4d9fe0d34da86344"),
// 	name:"Two states",
// 		author:"61951bfa4d9fe0d34da86829",
// 	price:50,
// 		ratings:4.5,
// 		publisher: "61951bfa4d9fe0d34da84523"
// }


const bookSchema = new mongoose.Schema( {
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,  // this line means that the author property is a reference to newAuthor collection so the advantage is that you can use the populate method to get the author details populate is used when you want to get the details of the author from the newAuthor collection
        ref: 'newAuthor'
    },
    price: Number,
    ratings: Number,
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newPublisher'
    },
    isHardCover: false
});

module.exports = mongoose.model('newBook', bookSchema)