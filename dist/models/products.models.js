"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var ProductModel = /** @class */ (function () {
    function ProductModel() {
        var _this = this;
        this.getProducts = function () {
            if (_this.productos.length == 0) {
                throw 'No hay productos cargados';
            }
            return _this.productos;
        };
        this.getOneProduct = function (id) {
            var producto = _this.productos.find(function (producto) { return producto.id === id; });
            if (!producto) {
                throw 'Producto no encontrado';
            }
            return producto;
        };
        this.addProduct = function (title, price, thumbnail) {
            var nuevoProducto = {
                id: _this.productos.length + 1,
                title: title,
                price: price,
                thumbnail: thumbnail,
            };
            _this.productos = __spreadArrays(_this.productos, [nuevoProducto]);
            return nuevoProducto;
        };
        this.deleteProduct = function (id) {
            var producto = _this.getOneProduct(id);
            _this.productos = _this.productos.filter(function (producto) { return producto.id !== id; });
            return producto;
        };
        this.modifyProduct = function (id, title, price, thumbnail) {
            var prod = _this.getOneProduct(id);
            prod.title = title;
            prod.price = price;
            prod.thumbnail = thumbnail;
            _this.productos = Object.assign(_this.productos, prod);
            return prod;
        };
        this.productos = [];
    }
    return ProductModel;
}());
exports.ProductModel = ProductModel;
