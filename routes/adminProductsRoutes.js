const express = require('express');
const router = express.Router();
const name = "Crud App";

const productService = require('../services/productService');
const categoryService = require('../services/categoryService');
const adminService = require('../services/adminService');

router.get('/products', function (req, res) {
    (async () => {
        if(req.session.admin){
            products = await productService.getProducts();
            res.render('products',
                {
                    title: name
                    , products: products
                    , updated: req.query.u
                    , deleted: req.query.d
                    , message: req.query.m
                    , success: req.query.s
                }
            );
        }
        else{
            res.redirect('/authenticate');
        }
    })();
});

router.get("/authenticate", function (req, res) {
    (async () => {
        res.render("login", {
            title: name
            , success : req.query.s
        });
    })();
});

router.post("/authenticate", function (req, res) {
    let params = req.body;
    (async () => {
        let response = await adminService.isValidUser(params);
        if(response.success){
            req.session.admin = response.data;
            res.redirect('/products');
        }
        else {
            res.render("login", {
                title: name
                ,message: response.message
            });
        }
    })();
});

router.get("/logout", function (req, res) {
    req.session.admin = null;
    (async () => {
        res.redirect('/authenticate');
    })();
});

router.get("/register", function (_, res) {
    (async () => {
        res.render("register", {
            title: name
        });
    })();
});

router.post("/register", function (req, res) {
    let params = req.body;
    (async () => {
        let response = await adminService.registerUser(params);
        if(response.success){
            res.redirect('/authenticate?s=1');
        }
        else {
            res.render("register", {
                title: name
                , message: response.message
            });
        }
    })();
});

router.get('/edit-product/:id', function (req, res) {
    const productId = req.params.id;
    (async () => {
        if(req.session.admin){
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
        }
        else{
            res.redirect('/authenticate');
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

router.get('/delete-product/:id', function (req, res) {
    let productId = req.params.id;
    (async () => {
        if(req.session.admin){
            let response = await productService.deleteProduct(productId);
            if (response.code != 200) {
                res.redirect(`/products?m=${response.message}`);
            }
            else {
                res.redirect('/products?d=1');
            }
        }
        else{
            res.redirect('/authenticate');
        }
    })();
});

router.get('/create-product', function (req, res) {
    (async () => {
        if(req.session.admin){
            categories = await categoryService.getCategories();
            res.render('create-product',
                {
                    title: name
                    , categories: categories
                    , message: req.query.m
                }
            );
        }
        else{
            res.redirect('/authenticate');
        }
    })();
});

router.post('/save-product', function (req, res) {
    let params = req.body;
    (async () => {
        let response = await productService.postProduct(params);
        if (response.code != 200) {
            res.redirect(`/create-product/?m=${response.data.message}`);
        }
        else {
            res.redirect('/products?s=1');
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