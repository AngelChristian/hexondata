var express = require('express');

const { signout, signin } = require('../controllers/authController.js');
var router = express.Router();

// signin
router.post('/signin', signin);
// signout
router.get('/signout', signout);

module.exports = router;
