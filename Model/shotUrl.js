const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    mainUrl:{
        type: String,
        required: true
    },
    currentUrl: {
        type: String,
        required: true,
    },
    customUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Short_Url",urlSchema)