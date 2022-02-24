const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Coffee = new Schema({
    name: String,
    country: String,
    type: String,
    price12: Number,
    price24: Number,
    roast_level: String,
    cupping_score: Number,
    tasting_notes: String,
    roastdates: Array,
    qty: Number
})

module.exports = mongoose.model('Coffee', Coffee);