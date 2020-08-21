const express = require('express');
const router = express.Router();
const name = "Crud App";

const productService = require('../services/productService');

router.get('/', function (_, res) {
    (async () => {
        products = await productService.getProducts();
        res.render('view-products',
            {
                name: name
                , products: products
            }
        );
    })();
});

module.exports = router;