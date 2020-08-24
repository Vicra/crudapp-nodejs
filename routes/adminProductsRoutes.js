const express = require('express');
const router = express.Router();
const name = "Crud App";

const productService = require('../services/productService');
const categoryService = require('../services/categoryService');

router.get('/products', function (req, res) {
    (async () => {
        products = await productService.getProducts();
        res.render('products',
            {
                title: name
                , products: products
                , updated: req.query.u
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
                        , message: req.query.m
                    }
                );
            }
        }
    })();
});

router.post('/update-product', function (req, res) {
    let params = req.body;
    (async () => {
        let response = await productService.putProduct(params);
        if (response.code != 200) {
            res.redirect(`/edit-product/${params.id}?m=${response.data.message}`);
        }
        else {
            res.redirect('/products?u=1');
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