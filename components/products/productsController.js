const productsService = require('./productsService');
const e = require("express");
exports.list = async (req, res) => {
    let products = await productsService.list(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1:0);
    res.render('products/productlist', {products: products});
}

exports.showDetail = async (req, res) => {
    const productDetail = await productsService.showDetail(req.query.ID)
    const comment = await productsService.Commentlist(req.query.ID, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1:0)
    res.render('products/productdetail', {productDetail: productDetail, comment: comment});
}

