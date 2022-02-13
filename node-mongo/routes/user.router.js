const express = require("express");
const router = express.Router()
const User = require("../models/user.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { 
  getToken, 
  COOKIE_OPTIONS, 
  getRefreshToken,
  verifyUser,
  } = require("../authenticate");

const { reset } = require("nodemon");

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

router.post("/refreshToken", (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies

  // retrieve refresh token from signed cookies
  if (refreshToken) {
    try {
      //verify the refresh token against secret used to create the refresh token
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      //extract the payload where user id is
      const userId = payload._id
      User.findOne({ _id: userId }).then(
        user => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              item => item.refreshToken === refreshToken
            )

            if (tokenIndex === -1) {
              res.statusCode = 401
              res.send("Unauthorized")
            } else {
              const token = getToken({ _id: userId })
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId })
              user.refreshToken[tokenIndex] = {refreshToken: newRefreshToken }
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500
                  res.send(err)
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                  res.send({ success: true, token })
                }
              })
            }
          } else {
            res.statusCode = 401
            res.send("Unauthorized")
          }
        },
        err => next(err)
      )
    } catch (err) {
      res.statusCode = 401
      res.send("Unauthorized")
    }
  } else {
    res.statusCode = 401
    res.send("Unauthorized")
  }
})

//call verifyUser middleware to call JWT strat to verify JWT and fetch user details
router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user)
})

router.get("/logout", verifyUser, (req, res, next) => {
  //extract refresh token
  const { signedCookies = {} } = req 
  const { refreshToken } = signedCookies
  User.findById(req.user._id).then(
    user => {
      //find from database and delete
      const tokenIndex = user.refreshToken.findIndex(
        item => item.refreshToken === refreshToken
      )

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          //delete from the cookie, too
          res.clearCookie("refreshToken", COOKIE_OPTIONS)
          res.send({ success: true })
        }
      })
    },
    err => next(err)
  )
})

module.exports = router