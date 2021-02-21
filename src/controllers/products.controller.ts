import { Request, Response } from 'express';
import { ProductModel } from '../models/products.models';

const product = new ProductModel();

export const getProducts = (req: Request, res: Response) => {
  try {
    return res.json(product.getProducts());
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const getOneProduct = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    return res.json(product.getOneProduct(Number(id)));
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const addProduct = (req: Request, res: Response) => {
  try {
    const { title, price, thumbnail } = req.body;
    product.addProduct(title, Number(price), thumbnail);
    return res.status(201).json('Producto creado');
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    return res.json(product.deleteProduct(Number(id)));
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const modifyProduct = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;

    return res.json(
      product.modifyProduct(Number(id), title, Number(price), thumbnail)
    );
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const productView = (req: Request, res: Response) => {
  try {
    const productos = product.getProducts();

    return res.render('vista', { productos });
  } catch (error) {
    return res.render('vista', { productos: 0 });
  }
};

export const productCharge = (req: Request, res: Response) => {
  const { title, price, thumbnail } = req.body;

  if (title && price && thumbnail) {
    product.addProduct(title, Number(price), thumbnail);
  }

  return res.render('carga');
};
