"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var app = express_1.default();
var PORT = 4000;
/*Middlewares*/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('./public'));
//Handlebars
app.engine('hbs', express_handlebars_1.default({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '../../views/layouts',
    partialsDir: __dirname + '../../views/partials',
}));
app.set('view engine', 'hbs');
app.set('views', './views');
/*Routes*/
app.use('/api', require('./routes/index'));
app.use('/productos', require('./routes/views'));
/*Starting the server*/
app.listen(PORT, function () {
    console.log("Server on port " + PORT);
});
