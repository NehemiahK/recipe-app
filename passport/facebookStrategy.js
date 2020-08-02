const User = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;

let config;
if (!process.env.IS_LIVE) {
  config = require('../config/keys');
}
const facebookClientID = process.env.FACEBOOK_APP_ID || config.facebookAppId;
const facebookClientSecret = process.env.FACEBOOK_APP_SECRET || config.facebookAppSecret
const callbackURL = process.env.IS_LIVE ? "https://www.pointsofcontact.org/auth/facebook/callback/" :
  "http://localhost:5000/auth/facebook/callback";

const strategy = (new FacebookStrategy(
  {
    clientID: facebookClientID,
    clientSecret: facebookClientSecret,
    callbackURL: callbackURL
  },
  function (accessToken, refreshToken, profile, done) {
    //console.log(strategy);

    User.findOne({ facebookId: profile.id }).then((existingUser) => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        console.log('new user')
        new User({ facebookId: profile.id }).save()
          .then((user) => done(null, user));
      }
    }).catch(err => console.log(err))
  }
));

module.exports = strategy