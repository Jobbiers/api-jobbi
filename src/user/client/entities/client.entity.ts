import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class UserClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({nullable: true, default: null})
  @IsString()
  @IsOptional()
  address?: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column({nullable: true, default: null})
  @IsOptional()
  @IsNumber()
  phone: number;

  @Column({nullable: true, default: null})
  @IsOptional()
  @IsString()
  expoToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => UserClientEntity, user => user.orders)
  orders: OrderEntity[];
}
