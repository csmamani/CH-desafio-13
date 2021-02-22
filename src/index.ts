import { Socket } from 'dgram';
import express, { Application, Request, Response } from 'express';
import Handlebars from 'express-handlebars';

const app: Application = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4000;

interface Producto {
  title: string;
  price: number;
  thumbnail: string;
}

let productos: Producto[] = [];

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
  res.render('vista', { productos });
});

/*Websockets*/
io.on('connection', (socket: any) => {
  console.log('New WebSocket connection');
  socket.broadcast.emit('message', 'A new user has joined!');

  socket.on('addProduct', (producto: Producto) => {
    productos.push(producto);
    io.emit('product', producto);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left');
  });
});

/*Starting the server*/
http.listen(port, () => {
  console.log(`Server on port ${port}`);
});
