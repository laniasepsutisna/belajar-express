const express = require('express')
const bodyParser = require("body-parser")
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()

const routerWeb = require('./router/web')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/belajar-express', {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(routerWeb)

app.listen(3000,  () => {
    console.log("Server running in port: 3000")
})