const express = require('express');
const router = express.Router();
const name = "Crud App";

const productService = require('../services/productService');
const categoryService = require('../services/categoryService');

router.get('/products', function (_, res) {
    (async () => {
        products = await productService.getProducts();
        res.render('products',
            {
                title: name
                , products: products
            }
        );
    })();
});

router.get('/edit-product/:id', function (req, res) {
    const productId = req.params.id;
    (async () => {
        if(productId && !isNaN(productId)){
            product = await productService.getProductById(productId);
            categories = await categoryService.getCategories();
            
            if(isEmptyObject(product.name)){
                res.render('404',
                    {
                        title: name
                        , type: 1
                    }
                );
            }
            else {
                res.render('edit-product',
                    {
                        title: name
                        , product: product
                        , categories: categories
                    }
                );
            }
        }
    })();
});

function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

module.exports = router;