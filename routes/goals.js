const express = require('express');
const router = express.Router();
let Goal = require('../models/goal');

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

router.get('/add', ensuiteAuth, (req, res) => {
  res.render('goal/add');
});

router.post('/add', (req, res) => {
  
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  
  let errors = req.validationErrors();

  if(errors){
    res.render('login');
  } else {
    let goal = new Goal();
    goal.title = req.body.title;
    goal.description = req.body.description;
    goal.user_id = req.user._id;
    goal.streak = 0;
    goal.save(err => {
      if (err) {
        console.log('123')
      } else {
        res.redirect('/goals');
      }
    })
  }
});

// router.post('/increment/:id', (req, res) => {
//   let query = { _id: req.params.id };

//   Goal.findById(query, (err, goal) => {
//     if (err) {
//       console.log(err);
//     } else {
//       goal.streak = goal.streak + 1;
//       Goal.update(query, goal, (err, res) => {
//         console.log(goal)
//         if (err) {
//           console.log(err);
//         } else {
//           req.flash('success', 'asd');
//         }
//       })
//     }
//   });
// });

router.get('/edit/:id', (req, res) => {
  let query = { _id: req.params.id };
  Goal.findById(req.params.id, (err, goal) => {
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
  }fb

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
  Goal.findById(req.params.id, (err, goal) => {
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

module.exports = function(io) {
  var app = require('express');

  io.on('connection', function(socket) { 
    console.log('connection');
  });

  return router;
}
