import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrderEntity } from '../../orders/entities/order.entity';
import { ProfessionalEntity } from 'src/user/professional/entities/professional.entity';
import { ServiceEntity } from 'src/services/entities/service.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Entity()
export class BusinessEntity {
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
  @IsDateString()
  @IsNotEmpty()
  openFrom: Date;

  @Column()
  @IsDateString()
  @IsNotEmpty()
  openTo: Date;
  
  @Column({type: "string", default: null})
  address: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Column()
  @IsOptional()
  photos: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => BusinessEntity, business => business.services)
  services: ServiceEntity[];

  @OneToMany(() => BusinessEntity, businss => businss.orders)
  orders: OrderEntity[];

  @OneToMany(() => BusinessEntity, business => business.professionals)
  professionals: ProfessionalEntity[];

  @ManyToOne(() => BusinessEntity, business => business.category)
  category: CategoryEntity;
}
