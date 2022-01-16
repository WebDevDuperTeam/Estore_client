const productsService = require('./productsService');
exports.list = async(req, res) => {
    // const products = await productsService.list(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0);
    try {
        const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        let searchName = req.query.key;
        searchName = "so mi";
        const products = await productsService.list(page, searchName);
        res.render('products/productlist', { products: products });

    } catch (err) {
        console.log(err);
    }
}

exports.showDetail = async(req, res) => {
    const productDetail = await productsService.showDetail(req.query.ID)
    res.render('products/productdetail', { productDetail: productDetail });
}