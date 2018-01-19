const express = require('express');
const router = express.Router();
const Goal = require('../models/goal');

/* GET all goals listing. */
router.get('/', (req, res) => {
  if (req.user) {
    res.render('index');
  }
});
/* GET all goals by user */
router.get('/all/:user', (req, res, next) => {

});

router.get('/add', (req, res) => {
  res.render('goal/add', {
    title: 'Add goals'
  });
});

router.post('/add', (req, res) => {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();

  let goal = new Goal();
  goal.title = req.title;
  goal.description = req.description;
  goal.user_id = req.user._id;
  goal.done = false;
  goal.save(err => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/');
    }
  })

})

function ensuiteAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('auth/login');
  }
}

module.exports = router;
