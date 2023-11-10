import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column('json')
  payment: any;

  @Column('json')
  delivery: any;

  @Column('text')
  comments: string;

  @Column({
    type: 'enum',
    enum: ['new', 'inProgress', 'shipped', 'delivered', 'cancelled'],
    default: 'new',
  })
  status: string;

  @Column('numeric')
  total: number;
}
