const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    // Datos API de Google
    clientID: "56544824751-8q360dkba87ni7tvo36n5uipplj0gv1t.apps.googleusercontent.com", 
    clientSecret: "4VBfmoiiHPVNIjUX1N6EYdm4",
    callbackURL: "http://localhost:4000/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      
      return done(null, profile);
   
  }
));