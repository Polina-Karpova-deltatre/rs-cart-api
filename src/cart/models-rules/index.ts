import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart
    ? cart.items.reduce((acc: number, { count }: CartItem) => {
        const price = Math.floor(Math.random() * 100) + 1;
        return (acc += price * count);
      }, 0)
    : 0;
}
