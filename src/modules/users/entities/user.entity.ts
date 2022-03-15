import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;

  @Column()
  public groupId: string;
}
export default User;
