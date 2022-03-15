import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Banner {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public location: string;

  @Column()
  public path: string;
}

export default Banner;