const passport = require('passport')
const User = require('../models/user')
const FacebookStrategy = require('./facebookStrategy')
const LocalStrategy = require('./localStrategy')



passport.serializeUser((user, done) => {
  console.log('serial')
    done(null, user.id);
  });
  
passport.deserializeUser((id, done) => {
  console.log('deserial')
    User.findById(id).then((user) => {
        done(null, user);
    }).catch(err => console.log(err))
  })

  passport.use(FacebookStrategy)
  passport.use(LocalStrategy)


module.exports = passport