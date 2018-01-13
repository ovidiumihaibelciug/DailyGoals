const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Abcd' });
});
router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;
