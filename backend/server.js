const express = require("express")
const connectDb = require('./db')
require('dotenv').config()


const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4000


const startServer =async()=>{

    try {
        await  connectDb()
        app.listen(PORT, ()=>{
            console.log(`server is running on port ${PORT}`)        
        })
    } catch (error) {

        console.log("Something went wrong!!")        
    }
}

startServer()





