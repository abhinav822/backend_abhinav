const mongoose = require('mongoose');

// {    
//     author_id:3,
//     author_name:"Ramanujan",
//     age:100,
//     address:"Tamilnadu"
// }

const authorSchema = new mongoose.Schema( {
    author_id: String,
    author_name: String,
    age: Number,
    address: String,
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema) //authors

// how to connect 2 schemas in mongoose 