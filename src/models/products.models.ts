export interface Producto {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export class ProductModel {
  private productos: Producto[];

  constructor() {
    this.productos = [];
  }

  getProducts = (): Producto[] => {
    if (this.productos.length == 0) {
      throw 'No hay productos cargados';
    }

    return this.productos;
  };

  getOneProduct = (id: number): Producto => {
    const producto = this.productos.find((producto) => producto.id === id);

    if (!producto) {
      throw 'Producto no encontrado';
    }

    return producto;
  };

  addProduct = (title: string, price: number, thumbnail: string): Producto => {
    const nuevoProducto: Producto = {
      id: this.productos.length + 1,
      title,
      price,
      thumbnail,
    };

    this.productos = [...this.productos, nuevoProducto];

    return nuevoProducto;
  };

  deleteProduct = (id: number): Producto => {
    const producto = this.getOneProduct(id);
    this.productos = this.productos.filter((producto) => producto.id !== id);

    return producto;
  };

  modifyProduct = (
    id: number,
    title: string,
    price: number,
    thumbnail: string
  ) => {
    const prod = this.getOneProduct(id);
    prod.title = title;
    prod.price = price;
    prod.thumbnail = thumbnail;
    this.productos = Object.assign(this.productos, prod);
    return prod;
  };
}
