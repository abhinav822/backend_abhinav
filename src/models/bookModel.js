const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const bookSchema = new mongoose.Schema({  // new is a keyword to create a new object of the class mongoose.Schema
    bookcover: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },

    title: {
        type: String,
        required:true,
        unique: true,
        trim: true
    },
    excerpt:{
        type : String,
        required: true,
        trim: true,
    },
    userId:{
        type: ObjectId,
        required: true,
        ref:"User"
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim : true
    },

    subcategory: {
        type: String,
        required: true,
        trim : true,
    },
    reviews :{
        type: Number,
        default: 0
    },
    deletedAt :{
        type: Date,
        default : null
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    releasedAt:{
        type: Date,
        required: true,
        format:"YYYY-MM-DD"
    }
},{timestamps: true})
module.exports= mongoose.model('Book',bookSchema) //