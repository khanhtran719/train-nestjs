import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Types } from 'mongoose';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;

  @Column()
  public groupId: Types.ObjectId;
}
export default User;
