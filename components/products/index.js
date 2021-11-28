var express = require('express');
var router = express.Router();

const productsController = require('./productsController');

/* GET productlist page. */
router.get('/', productsController.list);
router.get('/:productId', function(req, res, next) {
    res.render('products/productdetail');
});
module.exports = router;
