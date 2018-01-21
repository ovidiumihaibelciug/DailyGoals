const express = require('express');
const router = express.Router();
const Goal = require('../models/goal');

/* GET all goals listing. */
router.get('/', (req, res) => {
  if (req.user) {
    Goal.find({}, (err, goals) => {
      if (err) {
        console.log(err);
      } else {
        res.render('goal/all', {
          title: 'Goals',
          goals: goals,
        });
      }
    });
  } else {
    req.flash('danger', 'You have to login');
    res.redirect('/login');
  }
});

router.get('/add', (req, res) => {
  res.render('goal/add', {
    title: 'Add goals'
  });
});

router.post('/add', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();

  let goal = new Goal();
  goal.title = title;
  goal.description = description;
  goal.user_id = req.user._id;
  goal.done = 0;
  goal.save(err => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/goals');
    }
  })
});

router.get('/edit/:id', (req, res) => {
  let query = { _id: req.params.id };
  Goal.findOne(query, (err, goal) => {
    if (err) {
      console.log(err);
    } else {
      res.render('goal/edit', {
        goal: goal,
      })
    }
  });
});

router.post('/edit/:id', (req, res) => {
  let query = { _id: req.params.id }
  let goal = {};
  goal.title = req.body.title;
  goal.description = req.body.description;
  Goal.update(query, goal, err => {
    if (err) {
      console.log(err);
    } else {
      req.flash('success', 'Article updated');
      res.redirect('/goals/' + req.params.id);
    }
  });
});
router.delete('/delete/:id', (req, res) => {
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Goal.findById(req.params.id, (err, goal) => {
    if(goal.user_id != req.user._id){
      res.status(500).send();
    } else {
      Goal.remove(query, err => {
        if(err){
          console.log(err);
        }
        req.flash('success', 'Goal deleted :(')
        res.send('Success');
      });
    }
  });
});

router.get('/:id', (req, res) => {
  let query = { _id: req.params.id }
  Goal.findOne(query, (err, goal) => {
    if (err) {
      console.log(err);
    } else {
      res.render('goal/goal', {
        goal: goal,
      });
    }
  });
});

function ensuiteAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
