"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.set('PORT', process.env.PORT || 4000);
let productos = [];
let mensajes = [];
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
app.get('/', (req, res) => {
    res.render('vista', { productos, mensajes });
});
/*Websockets*/
io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    socket.on('addProduct', (producto) => {
        productos.push(producto);
        io.emit('product', producto);
    });
    socket.on('addMessage', (mensaje) => {
        let { date } = mensaje;
        let parsedDate = `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)} ${date.substr(11, 8)}`;
        mensaje.date = parsedDate;
        mensajes = [...mensajes, mensaje];
        fs_1.default.writeFileSync('mensajes.txt', JSON.stringify(mensajes), 'utf-8');
        io.emit('showMessage', mensaje);
    });
});
/*Starting the server*/
http.listen(app.get('PORT'), () => {
    console.log(`Server on port ${app.get('PORT')}`);
});
