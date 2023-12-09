import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from '../entities/transfer.entity';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { AccountService } from '../account/account.service';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer]), AccountModule],
  controllers: [TransferController],
  providers: [TransferService, AccountService],
})
export class TransferModule { }