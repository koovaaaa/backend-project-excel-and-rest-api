import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  yearOfBirth: string;
}
