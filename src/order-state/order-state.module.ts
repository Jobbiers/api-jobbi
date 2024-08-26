import { Module } from '@nestjs/common';
import { OrderStateService } from './order-state.service';
import { OrderStateController } from './order-state.controller';

@Module({
  controllers: [OrderStateController],
  providers: [OrderStateService],
})
export class OrderStateModule {}
