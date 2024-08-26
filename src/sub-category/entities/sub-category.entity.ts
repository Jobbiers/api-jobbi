import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subCategories)
  category: CategoryEntity;
}
