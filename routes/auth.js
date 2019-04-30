const validator = require('validator');
const passport = require('passport');
const express = require('express');
var db = require("../models");
const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.firstname !== 'string' || payload.firstname.trim().length === 0) {
    isFormValid = false;
    errors.firstname = 'Please provide your first name.';
  }

  if (!payload || typeof payload.lastname !== 'string' || payload.lastname.trim().length === 0) {
    isFormValid = false;
    errors.lastname = 'Please provide your last name.';
  }

  if (!payload || typeof payload.city !== 'string' || payload.city.trim().length === 0) {
    isFormValid = false;
    errors.city = 'Please provide city.';
  }

  if (!payload || typeof payload.birthday !== 'string' || payload.birthday.trim().length === 0) {
    isFormValid = false;
    errors.birthday = 'Please provide your birthday.';
  }

  if (!payload || payload.privacy.trim().length === 0) {
    isFormValid = false;
    errors.privacy = 'Please provide indicate your privacy setting.';
  }

  if (!payload || typeof payload.interest !== 'string' || payload.interest.trim().length === 0) {
    isFormValid = false;
    errors.interest = 'Please provide your research interest.';
  }



  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your username';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}


router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  console.log('hiiii');
  if (!validationResult.success) {
    console.log('invalid form');
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  return passport.authenticate('local-signup', (err) => {
    if (err) {
      console.log(err);
      if (err.name === 'DuplicateUsername') {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        console.log("duplicate username");
        return res.status(409).json({
          success: false,
          errors: {
            username: 'This user name is already taken.',
            message: 'Check the form for errors.'
          }
        });
      }
      console.log('could not process the form')
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate("local-signin", (err, token, userData) => {
    if (err) {
      console.log("authenticate failed");
      if (err.name === 'IncorrectCredentialsError') {
        console.log('True');
        console.log(err.message);
        return res.status(400).json({
          success: false,
          errors: {
            message: err.message
          }
        });
      }

      return res.status(400).json({
        success: false,
        errors: {
          message: 'Could not process the form.'
        }
      });
    }

    console.log("passport success");
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      user: {
        userData:userData,
        token:token
      }
    });
  })(req, res, next);
});

module.exports = router;
