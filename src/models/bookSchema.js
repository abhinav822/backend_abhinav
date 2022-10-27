const mongoose = require('mongoose');

// { 
//     name:"Two states",
//     author_id:1,
//     price:50,
//     ratings:4.5,
// } 

const bookSchema = new mongoose.Schema( {
    name: String,
    author_id: {type:Number,required:true},// so we should write this line
    price: Number,
    ratings: Number,
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) //books