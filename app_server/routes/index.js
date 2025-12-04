const passport = require('passport');
const Account = require('../models/account');

var express = require('express');
var router = express.Router();

const ctrlMain  = require('../controllers/main');
const ctrlOther = require('../controllers/others');

router.get('/',         ctrlMain.index);
router.get('/data', ctrlMain.data);
router.get('/login',    ctrlOther.login);
router.get('/register', ctrlOther.register);
router.post('/register', ctrlOther.registerUser);
router.get('/logout', ctrlOther.logout);


router.get('/register', function (req, res) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function (req, res, next) {
  Account.register(
    new Account({ username: req.body.username }),
    req.body.password,
    function (err, account) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/register');
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    }
  );
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  function (req, res) {
    res.redirect('/');
  }
);


router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
