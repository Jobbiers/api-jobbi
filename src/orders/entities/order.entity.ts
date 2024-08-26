import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserClientEntity } from '../../user/client/entities/client.entity';
import { ProfessionalEntity } from '../../user/professional/entities/professional.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ServiceEntity } from 'src/services/entities/service.entity';
import { OrderStateEntity } from 'src/order-state/entities/order-state.entity';

@Entity()
export class OrderEntity {
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
  @IsString()
  @IsNotEmpty()
  date: string;
  
  @Column()
  @IsString()
  @IsNotEmpty()
  price: string;

  @ManyToOne(() => OrderEntity, order => order.state)
  state: OrderStateEntity;

  @ManyToOne(() => OrderEntity, order => order.service)
  service: ServiceEntity;

  @ManyToOne(() => OrderEntity, order => order.userClient)
  userClient: UserClientEntity;

  @ManyToOne(() => OrderEntity, order => order.professional)
  professional: ProfessionalEntity;
}
