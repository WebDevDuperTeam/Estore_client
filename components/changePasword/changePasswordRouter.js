const express = require('express');
var router = express.Router();

const accountController = require('./changePasswordController');

router.get('/', accountController.showchangePasswordLayout);

module.exports = router;