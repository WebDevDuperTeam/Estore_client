const cartService = require('./cartService');
exports.list = async(req, res) => {
    const products = await cartService.list();
    res.render('cartLayout');
}