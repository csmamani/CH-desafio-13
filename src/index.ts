import express, { Application, Request, Response } from 'express';
import Handlebars from 'express-handlebars';
import fs from 'fs';

const app: Application = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('PORT', process.env.PORT || 4000);

interface Producto {
  title: string;
  price: number;
  thumbnail: string;
}

interface Mensaje {
  email: string;
  date: string;
  msg: string;
}

let productos: Producto[] = [];

let mensajes: Mensaje[] = [];

/*Middlewares*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Handlebars
app.engine(
  'hbs',
  Handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '../../views/layouts',
    partialsDir: __dirname + '../../views/partials',
  })
);
app.set('view engine', 'hbs');
app.set('views', './views');

/*Routes*/
app.get('/', (req: Request, res: Response) => {
  res.render('vista', { productos, mensajes });
});

/*Websockets*/
io.on('connection', (socket: any) => {
  console.log('New WebSocket connection');

  socket.on('addProduct', (producto: Producto) => {
    productos.push(producto);
    io.emit('product', producto);
  });

  socket.on('addMessage', (mensaje: Mensaje) => {
    let { date } = mensaje;
    let parsedDate = `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(
      0,
      4
    )} ${date.substr(11, 8)}`;

    mensaje.date = parsedDate;
    mensajes = [...mensajes, mensaje];

    fs.writeFileSync('mensajes.txt', JSON.stringify(mensajes), 'utf-8');

    io.emit('showMessage', mensaje);
  });
});

/*Starting the server*/
http.listen(app.get('PORT'), () => {
  console.log(`Server on port ${app.get('PORT')}`);
});
