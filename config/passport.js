const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    (email, password, done) => {
      console.log("Password authentication")
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email
        }
      }).then(dbUser => {
        // If there's no user with the given email
        if (!dbUser) {
          console.log("User does not exist!");
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        console.log("passport authentication - passed");
        return done(null, dbUser);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  console.log("passport.serializeUser");

  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  console.log("passport.deserializeUser");

  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
