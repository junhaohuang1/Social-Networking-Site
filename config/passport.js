//we import passport packages required for authentication
var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const jwtSecret = "a secret phrase!!"
//
//We will need the models folder to check passport agains
var db = require("../models");

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
},(req, username, password, done) =>{
    db.User.findOne({where: {username:username}}).then(function(user){
      if(user)
      {
        console.log('found existing user');
        const error = new Error('That username is already taken');
        error.name = 'DuplicateUsername';
        return done(error);
      } else {
        console.log('creating user')
        db.User.create({
          username: req.body.username.trim(),
          firstname: req.body.firstname.trim(),
          lastname: req.body.lastname.trim(),
          country: req.body.country.trim(),
          region:req.body.region.trim(),
          birthday: req.body.birthday,
          password: req.body.password.trim(),
          privacy: req.body.privacy ? 1 : 0,
          interest: req.body.interest.trim()
        }).then(function(newUser, created){
            if(!newUser){
              console.log('nothing created');
              return done(null,false);
            }
            if(newUser){
              console.log('user created');
              return done(null,newUser);
            }
          })
        }
      })
  })
)




// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use('local-signin', new LocalStrategy({
  // Our user will sign in using an email, rather than a "username"
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},function(req, username, password, done) {
    // When a user tries to sign in this code runs
    console.log(username)
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        const error = new Error('Incorrect username or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        const error = new Error('Incorrect username or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      // If none of the above, return the user
      const payload = {
        sub: dbUser.id
      };

      // create a token string
      const token = jwt.sign(payload, jwtSecret);
      const data = {
        username: dbUser.username,
        id: dbUser.id
      };
      return done(null, token, data);
    });
  }
));
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;
