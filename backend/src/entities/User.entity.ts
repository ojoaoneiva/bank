import { Entity, PrimaryColumn, Column, Unique, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Account } from './Account.entity';
import { Transfer } from './transfer.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@Unique(['user_id', 'email'])
export class User {
  @PrimaryColumn()
  user_id: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Account, account => account.user, { cascade: true, onDelete: 'CASCADE' })
  accounts: Account[];

  @OneToMany(() => Transfer, transfer => transfer.fromUser)
  transfersFrom: Transfer[];

  @OneToMany(() => Transfer, transfer => transfer.toUser)
  transfersTo: Transfer[];

  @BeforeInsert()
  addId() {
    this.user_id = `u${uuidv4().slice(0, 11)}`;
  }
}