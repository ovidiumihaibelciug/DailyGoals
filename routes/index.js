const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const User = require('../models/user');
const passport = require('passport');
router.use(expressValidator());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Abcd' });
});
/* GET register page. */
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});
router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Login',
  });
});
/* POST resgister page. */
router.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  req.checkBody('username', 'Username is required!').notEmpty();
  req.checkBody('email', 'Email is required!').notEmpty();
  req.checkBody('email', 'Email is not valid!').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    // res.render('auth/register', {
    //   errors: errors
    // });
  } else {
    let newUser = new User({
      username: username,
      email: email,
      password, password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) console.log(err);
        newUser.password = hash;
        newUser.save(err => {
          if (err) {
            console.log(err)
            return;
          } else {
            res.redirect('/');
          }
        });
      });
    });
  }
});
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'auth/login',
    failureFlash: 'false',
  })(req, res, next)
})
module.exports = router;
