import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public slug: string;

  @Column({ unique: true })
  public title: string;

  @Column()
  public description: string;
}

export default Category;
