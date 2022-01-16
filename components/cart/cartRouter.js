var express = require('express');
var router = express.Router();

const cartController = require('./cartController');
router.get('/', cartController.list)

module.exports = router;