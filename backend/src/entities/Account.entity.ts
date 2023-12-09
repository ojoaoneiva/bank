import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, BeforeInsert, OneToMany } from 'typeorm';
import { User } from './User.entity';
import { Transfer } from './transfer.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Account {
  @PrimaryColumn()
  account_id: string;

  @ManyToOne(() => User, user => user.accounts)
  user: User;

  @Column()
  account_number: string;

  @Column('decimal', { precision: 15, scale: 2, default: 0.0 })
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Transfer, transfer => transfer.fromUser)
  transfers: Transfer[];

  @BeforeInsert()
  addId() {
    this.account_id = `a${uuidv4().slice(0, 11)}`;
  }
}
