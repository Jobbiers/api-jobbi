import { Injectable } from '@nestjs/common';
import { CreateOrderStateDto } from './dto/create-order-state.dto';
import { UpdateOrderStateDto } from './dto/update-order-state.dto';

@Injectable()
export class OrderStateService {
  create(createOrderStateDto: CreateOrderStateDto) {
    return 'This action adds a new orderState';
  }

  findAll() {
    return `This action returns all orderState`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderState`;
  }

  update(id: number, updateOrderStateDto: UpdateOrderStateDto) {
    return `This action updates a #${id} orderState`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderState`;
  }
}
