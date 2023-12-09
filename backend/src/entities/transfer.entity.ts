import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, Unique, BeforeInsert } from 'typeorm';
import { User } from './User.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@Unique(['transfer_id'])
export class Transfer {
  @PrimaryColumn()
  transfer_id: string;

  @ManyToOne(() => User, user => user.transfersFrom)
  fromUser: User;

  @ManyToOne(() => User, user => user.transfersTo)
  toUser: User;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @BeforeInsert()
  addId() {
    this.transfer_id = `t${uuidv4().slice(0, 11)}`;
  }
}