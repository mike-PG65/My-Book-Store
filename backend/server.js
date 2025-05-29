const express = require("express")
const connectDb = require('./db')
const booksRoutes = require('./routes/book')
const Book = require('./models/Book')
const cors = require("cors")
require('dotenv').config()


const app = express()


app.use(cors())
app.use(express.json())
app.use('/api/books', booksRoutes);
const PORT = process.env.PORT || 4000


const startServer =async()=>{

    try {
        await  connectDb()

    //     const insertedBooks = await Book.insertMany(books);
    // console.log(`📚 Inserted ${insertedBooks.length} books successfully`);

    // const insertfeature = await Book.updateMany(
    //     {},
    //     { $set: { featured: false } }
    //   );

        app.listen(PORT, ()=>{
            console.log(`server is running on port ${PORT}`)        
        })
    } catch (error) {

        console.log("Something went wrong!!")        
    }
}

startServer()





