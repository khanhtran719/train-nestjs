import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class MutipleLanguages {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public lang: string;

  @Column()
  public content: string;
}

export default MutipleLanguages;
