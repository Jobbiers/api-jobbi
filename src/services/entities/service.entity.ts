import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrderEntity } from '../../orders/entities/order.entity';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Entity()
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsArray()
  @IsOptional()
  photos: string

  @ManyToOne(() => ServiceEntity, service => service.business)
  business: BusinessEntity;
  
  @ManyToOne(() => ServiceEntity, service => service.category)
  category: CategoryEntity;

  @OneToMany(() => ServiceEntity, service => service.orders)
  orders: OrderEntity;
}
