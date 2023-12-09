import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from '../entities/transfer.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
  ) { }

  async getTransferById(id: any): Promise<any[]> {
    const transfers = await this.transferRepository
      .createQueryBuilder('transfer')
      .leftJoinAndSelect('transfer.fromUser', 'fromUser')
      .leftJoinAndSelect('transfer.toUser', 'toUser')
      .where('fromUser.user_id = :id OR toUser.user_id = :id', { id })
      .select(['transfer.transfer_id', 'transfer.amount', 'transfer.created_at', 'fromUser.email', 'fromUser.name', 'toUser.email', 'toUser.name'])
      .getMany();

    return transfers;
  }

  async transfer(fromUserId: string, toUserId: string, amount: number): Promise<void> {
    try {
      const transfer = this.transferRepository.create({
        fromUser: { user_id: fromUserId },
        toUser: { user_id: toUserId },
        amount,
      });

      await this.transferRepository.save(transfer);
    } catch (error) {
      console.error('Error during transfer:', error);
      throw error;
    }
  }

  async createTransfer(fromUserId: string, toUserId: string, amount: number): Promise<Transfer> {
    const transfer = this.transferRepository.create({
      fromUser: { user_id: fromUserId },
      toUser: { user_id: toUserId },
      amount,
    });

    return this.transferRepository.save(transfer);
  }

}