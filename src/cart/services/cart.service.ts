import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    let userCart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items'], // This ensures that the items are loaded with the cart
    });

    if (!userCart) {
      userCart = this.cartRepository.create({
        userId,
        status: 'OPEN', // Assuming a new cart is always 'OPEN'
      });
      await this.cartRepository.save(userCart);
    }

    return userCart;
  }

  async addCartItem(userId: string, productId: string, count: number): Promise<CartItem> {
    const cart = await this.findOrCreateByUserId(userId);

    let cartItem = await this.cartItemRepository.findOne({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (cartItem) {
      // If the item already exists in the cart, update the count
      cartItem.count += count;
    } else {
      // If the item does not exist, create a new CartItem
      cartItem = this.cartItemRepository.create({
        cartId: cart.id,
        productId,
        count,
      });
    }

    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }

  async removeCartItem(cartId: string, productId: string): Promise<void> {
    await this.cartItemRepository.delete({
      cartId,
      productId,
    });
  }

  async updateCartItem(userId: string, productId: string, count: number): Promise<CartItem> {
    const cart = await this.findOrCreateByUserId(userId);

    let cartItem = await this.cartItemRepository.findOne({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!cartItem) {
      throw new Error('Item not found in the cart');
    }

    cartItem.count = count; // Set the new count
    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }
  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartRepository.findOneBy({ userId });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const newCart = this.cartRepository.create({
      id: uuidv4(),
      userId: userId,
      items: [],
    });

    await this.cartRepository.save(newCart);
    return newCart;
  }

  async updateByUserId(userId: string, cartData: Cart): Promise<Cart> {
    let userCart = await this.findOrCreateByUserId(userId);

    userCart.items = cartData.items;
    
    await this.cartRepository.save(userCart);

    return userCart;
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartRepository.delete({ userId });
  }
}
