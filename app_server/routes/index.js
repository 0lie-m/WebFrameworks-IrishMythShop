var express = require('express');
var router = express.Router();

const ctrlMain  = require('../controllers/main');
const ctrlOther = require('../controllers/others');

router.get('/',         ctrlMain.index);
router.get('/login',    ctrlOther.login);
router.get('/register', ctrlOther.register);

module.exports = router;
