const express = require("express")
const expresslayouts = require("express-ejs-layouts")
const colors = require("colors")
const Short_Url = require("./Model/shotUrl")
const connectToDb = require("./config/db_config")
const rateLimit = require("express-rate-limit");
const app = express()
const dotenv = require("dotenv").config()


//Database connection
connectToDb()

//express middleware
app.use(expresslayouts)

// View engine
app.set("view engine", "ejs")

// Express body parser
app.use(express.urlencoded({ extended: true }));

//rate limit middleware
const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter)

//global variable middleware
app.use((req, res, next) => {
    res.locals.currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
    next()
})

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/", async (req, res) => {
    let errors = []
    const { mainUrl, customUrl, currentUrl } = req.body
    if (!mainUrl || !customUrl) {
        const err = "Please fill all the fields"
        errors.push({ msg: err })
    }
    if (errors.length > 0) {
        console.log(errors)
        return res.render("index", { errors })
    }
    try {
        const url = await Short_Url.create({
            mainUrl, currentUrl, customUrl
        })

        await url.save()
        res.render("index", { currentUrl, customUrl })
    } catch (error) {
        console.log(error)
    }
})

app.get("/:customurl", async (req, res) => {
    try {
        const url = await Short_Url.findOne({ customUrl: req.params.customurl })
        if (url) {
            res.redirect(url.mainUrl)
        }
    } catch (err) {
        console.log(err)
    }
})

app.get("*", (req, res) => {
    res.send(`<h1> 404, Page Not Found</h1>`)
})











const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`.green.bold.underline)
})