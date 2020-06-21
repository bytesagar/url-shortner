const mongoose = require("mongoose")
const dotenv = require("dotenv")


const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const DB_URI = "mongodb://localhost:27017/url-shortner"

const connectToDb = async () =>{
    try {
       const connect =  await mongoose.connect(DB_URI,connectionOptions)
        if(connect) console.log(`Database connected successfully`.yellow.bold.underline)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDb