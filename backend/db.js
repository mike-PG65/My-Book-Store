require('dotenv').config()

const mongoose = require('mongoose')

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })

          console.log("Connected to mongo")
    } catch (error) {

        console.log("Error connecting to the database!!",error)        
    }
}

module.exports = connectDb