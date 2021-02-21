import { Router } from 'express';
const router = Router();
import { productView, productCharge } from '../controllers/products.controller';

router.get('/vista', productView);

router.get('/carga', productCharge);

router.post('/carga', productCharge);

module.exports = router;
