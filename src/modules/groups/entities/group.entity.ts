import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Group {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public name: string;

  @Column({ default: 'read' })
  public permission: string;
}

export default Group;
