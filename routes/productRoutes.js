const express = require('express');
const router = express.Router();
const name = "Crud App";

const productService = require('../services/productService');

router.get('/', function (_, res) {
    (async () => {
        products = await productService.getProducts();
        res.render('view-products',
            {
                title: name
                , products: products
            }
        );
    })();
});

router.get('/:id', function (req, res) {
    const productId = req.params.id;
    (async () => {
        if(productId && !isNaN(productId)){
            product = await productService.getProductById(productId);
            res.render('view-product',
                {
                    title: name
                    , product: product
                }
            );
        }
    })();
});

module.exports = router;