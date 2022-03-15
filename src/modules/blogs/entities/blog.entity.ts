import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Types } from 'mongoose';

@Entity()
class Blog {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public image: string;

  @Column()
  public imgageThumb: string;

  @Column()
  public imageAlt: string;

  @Column()
  public title: Types.ObjectId;

  @Column()
  public description: Types.ObjectId;

  @Column()
  public categoryId: Types.ObjectId;
}

export default Blog;
