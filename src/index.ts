import express, { Application, Request, Response } from 'express';
import Handlebars from 'express-handlebars';

const app: Application = express();
const PORT = 4000;

/*Middlewares*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

//Handlebars
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
app.use('/api', require('./routes/index'));
app.use('/productos', require('./routes/views'));

/*Starting the server*/
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
