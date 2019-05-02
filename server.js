const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
var passport = require("./config/passport");
// const User = require('./models/user');
const jwt = require('jsonwebtoken');
const app = express();
const morgan = require('morgan'); // JUST FOR LOGS
const session = require('express-session') // for sessions
const PORT = process.env.PORT || 3001;
const jwtSecret = "a secret phrase!!";
var db = require("./models");
var cors = require('cors')


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors())
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
app.use(morgan('combined'))


const authCheckMiddleware = (req, res, next) => {
  // console.log(req.headers);
  if (!req.headers.authorization) {
    console.log('no header authorization');
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  // const token = req.headers.authorization.split(' ')[1];
  // decode the token using a secret key-phrase
  // const token = req.headers.authorization.split('"')[9];
  token = req.headers.authorization;
  // console.log(req.headers);
  return jwt.verify(token, jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      // console.log(err);
      return res.status(401).end();
    }

    const userId = decoded.sub;

    // check if a user exists
    return db.User.findOne({
      where: {
        id: userId
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
