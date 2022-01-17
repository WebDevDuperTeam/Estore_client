const productsService = require('./productsService');
const e = require("express");
// exports.list = async (req, res) => {
//     let products = await productsService.list(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1:0);
//     res.render('products/productlist', {products: products});
// }

exports.list = async(req, res) => {
    try {
        const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;

        const searchName = req.query.key;

        const gt = req.query.gt;
        const price = req.query.price;
        let prices = Array(0, 1);
        if (price != null) {
            prices = price.split(',')
        }
        const mau = req.query.mau;

        const products = await productsService.list(page, searchName, gt, prices[0] * 22000, prices[1] * 22000, mau);
        res.render('products/productlist', { products: products });

    } catch (err) {
        console.log(err);
    }
}

exports.showDetail = async (req, res) => {
    const productDetail = await productsService.showDetail(req.query.ID)
    const comment = await productsService.Commentlist(req.query.ID, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1:0)
    res.render('products/productdetail', {productDetail: productDetail, comment: comment});
}

