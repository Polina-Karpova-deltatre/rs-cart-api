import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../entities/order.entity'; // Update the import path according to your project structure

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>, // Inject the repository
  ) {}

  async findById(orderId: string): Promise<Order> {
    return await this.orderRepository.findOneBy({ id: orderId });
  }

  async create(data: any) {
    const order = this.orderRepository.create({
      ...data,
      id: uuidv4(),
      status: 'inProgress',
    });

    await this.orderRepository.save(order);
    return order;
  }

  async update(orderId: string, data: any): Promise<Order> {
    let order = await this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    order = {
      ...order,
      ...data,
    };

    await this.orderRepository.save(order);
    return order;
  }
}
