const passport = require('passport');
const { usersConn } = require('../../app_api/models/db');
const User = usersConn.model('User');

const register = (req, res) => {
  res.render('register', { title: 'Register' });
};

const login = (req, res) => {
  res.render('login', { title: 'Login' });
};

const registerUser = (req, res, next) => {
  const userData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    county: req.body.county,
    eircode: req.body.eircode
  };

  const password = req.body.password;

  User.register(new User(userData), password, (err, user) => {
    if (err) {
      req.flash('error', err.message || 'Registration failed');
      return res.redirect('/register');
    }

    req.login(user, err2 => {
      if (err2) return next(err2);
      res.redirect('/');
    });
  });
};

const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash('error', (info && info.message) || 'Login failed');
      return res.redirect('/login');
    }

    req.logIn(user, err2 => {
      if (err2) return next(err2);
      res.redirect('/');
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
};

module.exports = {
  login,
  register,
  registerUser,
  loginUser,
  logout
};
