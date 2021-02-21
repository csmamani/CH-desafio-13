"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var products_controller_1 = require("../controllers/products.controller");
/*Routes*/
router.get('/productos', products_controller_1.getProducts);
router.get('/productos/:id', products_controller_1.getOneProduct);
router.post('/productos', products_controller_1.addProduct);
router.delete('/productos/:id', products_controller_1.deleteProduct);
router.put('/productos/:id', products_controller_1.modifyProduct);
module.exports = router;
