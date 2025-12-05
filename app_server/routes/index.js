var express = require('express');
var router = express.Router();

const ctrlMain  = require('../controllers/main');
const ctrlOther = require('../controllers/others');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

router.get('/', ctrlMain.index);
router.get('/data', ensureAuthenticated, ctrlMain.data);

router.get('/register', ctrlOther.register);
router.post('/register', ctrlOther.registerUser);

router.get('/login', ctrlOther.login);
router.post('/login', ctrlOther.loginUser);

router.get('/logout', ctrlOther.logout);

module.exports = router;
