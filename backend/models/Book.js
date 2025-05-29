const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    author:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        maxlength: 1000

    },

    coverImage:{
        type:String,
        default: "https://i.pinimg.com/736x/a4/b0/83/a4b083ddcc0443af3d910e91cce27263.jpg"
    },
    rating:{
        type: Number,
        default: 0,
        min: 0,
    max: 5,
    },
    stock:{
        type:Number,
        required: true
    },
    pages:{
        type: Number,
        required: true
    },

    publishedYear:{
        type: Number,
    },

    isbn: {
        type: String,
        unique: true,
        required: true,
      },
      language: {
        type: String,
        default: 'English',
      },
      publisher: {
        type: String,
      },

      featured: {
        type: Boolean,
        enum: ["true","false"],
        default: false,
      },



}, {timestamps: true})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book