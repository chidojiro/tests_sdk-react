import { Cart, Product } from "types";
import { v4 as UUID } from "uuid";
import ldRemove from "lodash/remove";

const defaultCart: Cart = {
  id: UUID(),
  items: [],
};

const StorageKey = "CART";

const get = async (): Promise<Cart> => {
  try {
    return JSON.parse(localStorage.getItem(StorageKey) || "") || defaultCart;
  } catch {
    return defaultCart;
  }
};

// ignore cartId in the test to reduce complication
const update = async (cartId: string, cart: Cart): Promise<Cart> => {
  localStorage.setItem(StorageKey, JSON.stringify(cart));

  return cart;
};

const add = async (product: Product): Promise<Cart> => {
  const cart = await get();

  const existingItem = cart.items.find(({ id }) => id === product.id);

  if (existingItem) {
    existingItem.count += 1;
  } else {
    cart.items.push({ id: product.id, count: 1, details: product });
  }

  const newCart = await update(cart.id, cart);

  return newCart;
};

const remove = async (productId: string): Promise<Cart> => {
  const cart = await get();

  ldRemove(cart.items, (item) => item.id === productId);

  const newCart = await update(cart.id, cart);

  return newCart;
};

const CartApis = { get, add, remove, update };

export default CartApis;
