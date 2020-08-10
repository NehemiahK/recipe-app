const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

const strategy = (new LocalStrategy(
  function(username,password,done) {
    User.findOne({}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
          console.log('user does not exist')
        return done(null, false, { message: 'Incorrect username.' });
      }
      console.log('user',user)
      return done(null, user);
    });
  }
));

module.exports = strategy