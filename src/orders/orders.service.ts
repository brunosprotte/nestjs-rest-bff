import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FilterDTO } from '../dto/query.dto';
import { OrderClient } from '../client/order/order.client';

@Injectable()
export class OrdersService {

  constructor(private readonly orderClient: OrderClient) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll(query: FilterDTO) {
    return this.orderClient.getOrders(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
