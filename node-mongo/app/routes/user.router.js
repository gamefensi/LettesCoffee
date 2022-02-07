const express = require("express");
const router = express.Router()
const User = require("../models/user.model");
const passport = require("passport");

const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../authenticate")

router.post("/signup", (req, res, next) => {
  //Verify that first name is not empty

  const { username, password, firstName, lastName } = req.body;

  if (!firstName) {
    res.statusCode = 500
    res.send({
      name: "FirstNameError",
      message: "The first name is required",
    })
  } else {
    User.register(
      new User({ username: username }),
      password,
      (err, user) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          user.firstName = firstName
          user.lastName = lastName || ""
          const token = getToken({ _id: user._id })
          const refreshToken = getRefreshToken({ _id: user._id })
          user.refreshToken.push({ refreshToken })
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500
              res.send(err)
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
              res.send({ success: true, token })
            }
          })
        }
      }
    )
  }

})

// Call local authentication strat: only if credentials are valid, then give control to body of route
router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id })
  const refreshToken = getRefreshToken({ _id: req.user._id })
  User.findById(req.user._id).then(
    user => {
      // If user is successful log in, generate auth & refresh token 
      user.refreshToken.push({ refreshToken })
      user.save((err, user) => {
        // Save to database & set in response cookie
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          //send JWT in response body so that client can attach to follow up request
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
          res.send({ success: true, token })
        }
      })
    },
    err => next(err)
  )
})


module.exports = router