import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { BusinessEntity } from 'src/business/entities/business.entity';

@Entity()
export class ProfessionalEntity {
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

  @Column({type: "string", default: null})
  specialization: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => ProfessionalEntity, user => user.orders)
  orders: OrderEntity[];

  @OneToMany(() => ProfessionalEntity, user => user.business)
  business: BusinessEntity;

}