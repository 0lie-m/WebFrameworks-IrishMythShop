var express = require('express');
var router = express.Router();
const ctrlLocations = require('../app_server/controllers/locations');
const ctrlOthers = require('../app_server/controllers/others');

/* Home page */
router.get('/', ctrlLocations.index);

/* Auth pages (keeping your original pages, just structured like lecturer's) */
router.get('/login', ctrlOthers.login);
router.get('/register', ctrlOthers.register);

module.exports = router;
