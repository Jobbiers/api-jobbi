import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { ServiceEntity } from 'src/services/entities/service.entity';

@Entity()
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Column()
  @IsOptional()
  @IsNotEmpty()
  comment?: string;

  
  // @ManyToOne(() => BusinessEntity, (business) => business.ratings)
  // business: BusinessEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.ratings)
  service: ServiceEntity;
}