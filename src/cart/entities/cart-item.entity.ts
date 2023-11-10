import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'cart_id' })
  cartId: string;

  @Column('uuid', { name: 'product_id' })
  productId: string;

  @Column('int')
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
