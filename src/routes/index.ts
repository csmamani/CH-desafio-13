import { Router } from 'express';
const router = Router();

import {
  getProducts,
  getOneProduct,
  addProduct,
  deleteProduct,
  modifyProduct,
} from '../controllers/products.controller';

/*Routes*/
router.get('/productos', getProducts);

router.get('/productos/:id', getOneProduct);

router.post('/productos', addProduct);

router.delete('/productos/:id', deleteProduct);

router.put('/productos/:id', modifyProduct);

module.exports = router;
