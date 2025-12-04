const passport = require('passport');
const { usersConn } = require('../../app_api/models/db');
const User = usersConn.model('User');

const registerUser = (req, res) => {
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

  User.register(new User(userData), req.body.password, (err, account) => {
    if (err) {
      console.log(err);
      return res.render('register', {
        title: 'Register',
        error: err.message
      });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
};

const login = (req, res) => {
  res.render('login', { title: 'Login' });
};

const register = (req, res) => {
  res.render('register', { title: 'Register' });
};

const loginUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

const logout = (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
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
