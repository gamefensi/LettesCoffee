const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

//Store refresh tokens
const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const User = new Schema({
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    authStrategy: {
        type: String,
        default: "local",
    },
    //array of refresh tokens to support sign in from multiple devices 
    refreshToken: {
        type: [Session],
    },
});

//Remove refreshToken from the response, so we don't expose users refresh tokens when we serialize the model and send data in the API response
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User);