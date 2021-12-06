const express = require('express');
var router = express.Router();

const accountController = require('./accountController');

router.get('/', accountController.showAccountLayout);

module.exports = router;