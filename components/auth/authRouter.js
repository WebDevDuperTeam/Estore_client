var express = require('express');
var router = express.Router();

const authController = require('./authController');
const passport = require('../../auth/passport');

router.get('/auth', authController.showAuthLayout);
router.post('/auth', passport.authenticate('local'), authController.signIn);

router.get('/logout', authController.logout);

module.exports = router;