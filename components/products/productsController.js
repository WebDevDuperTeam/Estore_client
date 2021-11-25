const productsService = require('./productsService');
exports.list = async (req, res) => {
    const products = await productsService.list();
    res.render('products/productlist', {products});
}