const express = require('express');
const Book = require('../models/Book')

const router = express.Router();

router.get('/', async(req, res)=>{
    try {
        const books = await Book.find()
        res.status(200).json(books)
        
    } catch (error) {
        res.status(500).json({ error: err.message });
        
    }

})


router.get('/featured', async(req, res)=>{
    try {
        const featuredBooks = await Book.find({featured: true})

        if (!featuredBooks){
            return res.status(404).json({Message: "Books not found!!"})
        }

        res.json(featuredBooks);
    } catch (error) {
        console.log("Books not found!!", error)
        return res.status(500).json({Message: "Books not found!!"})
        
    }
})

router.get('/:bookId', async(req, res)=>{

    const {bookId} = req.params

    try {
        const foundBook = await Book.find({_id:bookId})

        res.json(foundBook)
    } catch (error) {
        console.log("Something went wrong fetching the book!!",error)
        return res.status(500).json({message: "Something went wrong fetching the book!!"})
    }
    
})

module.exports = router
