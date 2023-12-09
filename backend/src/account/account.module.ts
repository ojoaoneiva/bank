import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/Account.entity';
import { AccountService } from './account.service';
import { AccountsController } from './account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  exports: [TypeOrmModule, AccountService],
  providers: [AccountService],
    controllers: [AccountsController]
})
export class AccountModule {}
