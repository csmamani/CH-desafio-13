"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCharge = exports.productView = exports.modifyProduct = exports.deleteProduct = exports.addProduct = exports.getOneProduct = exports.getProducts = void 0;
var products_models_1 = require("../models/products.models");
var product = new products_models_1.ProductModel();
var getProducts = function (req, res) {
    try {
        return res.json(product.getProducts());
    }
    catch (error) {
        return res.status(404).json({ error: error });
    }
};
exports.getProducts = getProducts;
var getOneProduct = function (req, res) {
    try {
        var id = req.params.id;
        return res.json(product.getOneProduct(Number(id)));
    }
    catch (error) {
        return res.status(404).json({ error: error });
    }
};
exports.getOneProduct = getOneProduct;
var addProduct = function (req, res) {
    try {
        var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
        return res.json(product.addProduct(title, Number(price), thumbnail));
    }
    catch (error) {
        return res.status(404).json({ error: error });
    }
};
exports.addProduct = addProduct;
var deleteProduct = function (req, res) {
    try {
        var id = req.params.id;
        return res.json(product.deleteProduct(Number(id)));
    }
    catch (error) {
        return res.status(404).json({ error: error });
    }
};
exports.deleteProduct = deleteProduct;
var modifyProduct = function (req, res) {
    try {
        var id = req.params.id;
        var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
        return res.json(product.modifyProduct(Number(id), title, Number(price), thumbnail));
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
};
exports.modifyProduct = modifyProduct;
var productView = function (req, res) {
    try {
        var productos = product.getProducts();
        return res.render('vista', { productos: productos });
    }
    catch (error) {
        return res.render('vista', {});
    }
};
exports.productView = productView;
var productCharge = function (req, res) {
    var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
    var newProduct = product.addProduct(title, Number(price), thumbnail);
    return res.render('carga');
};
exports.productCharge = productCharge;
