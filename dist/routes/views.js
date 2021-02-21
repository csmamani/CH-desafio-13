"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var products_controller_1 = require("../controllers/products.controller");
router.get('/vista', products_controller_1.productView);
router.get('/carga', products_controller_1.productCharge);
router.post('/carga', products_controller_1.productCharge);
module.exports = router;
