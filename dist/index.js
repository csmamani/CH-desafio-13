"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var app = express_1.default();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = 4000;
var productos = [];
/*Middlewares*/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('./public'));
// Handlebars
app.engine('hbs', express_handlebars_1.default({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '../../views/layouts',
    partialsDir: __dirname + '../../views/partials',
}));
app.set('view engine', 'hbs');
app.set('views', './views');
/*Routes*/
app.get('/', function (req, res) {
    res.render('vista', { productos: productos });
});
/*Websockets*/
io.on('connection', function (socket) {
    socket.broadcast.emit('mensaje', 'Desde el server');
    console.log(socket.id);
    socket.on('producto', function (producto) {
        productos = __spreadArrays(productos, [producto]);
        io.emit('producto', producto);
    });
});
/*Starting the server*/
http.listen(PORT, function () {
    console.log("Server on port " + PORT);
});
