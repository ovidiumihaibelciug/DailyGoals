const passport = require('passport');
const User = require('./models/user.js');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('local-strategy').Strategy;

module.exports = (passprt) => {
  passport.use(new LocalStrategy((username, password, done) =>{
    let query = { username: username }
    User.findOne(query, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect username or password' });
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Incorrect username or password' })
        }
      })

    });
    passport.serializeUser(function(user, done) {
    done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
  }));
}
