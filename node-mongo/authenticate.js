const passport = require('passport');
const jwt = require('jsonwebtoken');
const dev = process.env.NODE_ENV !== 'production'

//used for creating refresh token cookie
exports.COOKIE_OPTIONS = {
    //httpOnly to mitigate XSS attack
    httpOnly: true,
    //Since localhost is not having https protocol,
    //secure cookies do not work correctly (in postman)
    secure: !dev,
    signed: true,
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    //none since client and server set to different domains
    sameSite: "none",
}

//create JWT
exports.getToken = user => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: eval(process.env.SESSION_EXPIRY),
    })
}

//create refresh JWT
exports.getRefreshToken = user => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
    })
    return refreshToken
}

//middleware called for every auth req
exports.verifyUser = passport.authenticate("jwt", {session: false })
