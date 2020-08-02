const passport = require('passport')
const User = require('../models/user')
const FacebookStrategy = require('./facebookStrategy')

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    }).catch(err => console.log(err))
  })

  passport.use(FacebookStrategy)

module.exports = passport