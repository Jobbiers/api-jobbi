import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { OrderEntity } from 'src/orders/entities/order.entity';

@Entity()
export class OrderStateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => OrderStateEntity, state => state.orders)
  orders: OrderEntity[];
}
