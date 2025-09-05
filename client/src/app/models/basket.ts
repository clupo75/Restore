import type { Product } from "./product";

export type Basket = {
  basketId: string;
  items: Item[];
};

export class Item {
  constructor(product: Product, quantity: number) {
    this.productId = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.pictureUrl = product.pictureUrl;
    this.type = product.type;
    this.brand = product.brand;
    this.quantityInStock = product.quantityInStock;
    this.quantity = quantity;
  }
  productId: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
  quantity: number;
}
