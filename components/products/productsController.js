const productsService = require('./productsService');
exports.list = async (req, res) => {
    const products = await productsService.list(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1:0);
    res.render('products/productlist', {products: products});
}