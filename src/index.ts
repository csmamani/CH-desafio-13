import express, { Application, Request, Response } from 'express';
import Handlebars from 'express-handlebars';

const app: Application = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 4000;

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
  socket.broadcast.emit('mensaje', 'Desde el server');

  console.log(socket.id);

  socket.on('producto', (producto: Producto) => {
    productos = [...productos, producto];
    io.emit('producto', producto);
  });
});

/*Starting the server*/
http.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
