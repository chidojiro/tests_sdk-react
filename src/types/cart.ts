import { Product } from "./product";

export type CartItem = {
  id: string;
  details: Product;
  count: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
};
