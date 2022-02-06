const mongoose = require("mongoose")
const url = process.env.DATABASE
const connect = mongoose.connect(url)

connect
    .then(db => {
        console.log("connected to db")
    })
    .catch(err => {
        console.log(err)
    })