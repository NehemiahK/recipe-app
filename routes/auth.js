const router = require('express').Router()
const passport = require('passport')

const reidrectUrl = process.env.IS_LIVE ? '/' : 'http://localhost:3000'

//only allow local login when the site is not live.
if(!process.env.IS_LIVE){
    router.post('/loginlocal',
    passport.authenticate('local'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.json(req.user);
    });
  
}

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    
    res.redirect(reidrectUrl)
});

router.get('/logout', (req,res) => {
    if(!process.env.IS_LIVE){
        // remove all session data 
        req.session = null;
    }
    else{
        req.logOut();
    }
    res.redirect(reidrectUrl)
})

module.exports = router;