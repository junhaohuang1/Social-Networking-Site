const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
var passport = require("./config/passport");
// const User = require('./models/user');
// const jwt = require('jsonwebtoken');
const app = express();
const morgan = require('morgan'); // JUST FOR LOGS
const session = require('express-session') // for sessions
const PORT = process.env.PORT || 3001;
const jwtSecret = "a secret phrase!!";
var db = require("./models");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
app.use(express.static("client/public"));


app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());


// pass the authenticaion checker middleware
const authCheckMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return db.User.findOne({
      where: {
        userId: userId
      }
    }).then(function(dbUser) {
        if (!dbUser) {
          return res.status(401).end();
        }
      return next();
    });
  });
}




app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);



// Start the API server
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
})
