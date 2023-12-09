import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager } from "typeorm";
import { Account } from "../entities/Account.entity";
import { BadRequestError } from "src/erros/BadRequestError";
import * as dotenv from 'dotenv-safe';

dotenv.config();

@Injectable()
export class AccountService {
  private secretKey: string;

  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {
    this.secretKey = process.env.JWT_KEY;
  }

  async getAccounts(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async transfer(fromUserId: string, toUserEmail: string, amount: number): Promise<Account[]> {

    return this.accountRepository.manager.transaction(async (transactionalEntityManager) => {

      const receiverAccount = await this.getAccountByUserEmail(toUserEmail, transactionalEntityManager);
      const senderAccount = await this.getAccountByUserId2(fromUserId, transactionalEntityManager);

      if (!senderAccount || !receiverAccount) {
        throw new NotFoundException("Sender or receiver account not found");
      }

      if (senderAccount.balance < amount) {
        throw new BadRequestError("Insufficient funds");
      }

      senderAccount.balance -= amount;
      receiverAccount.balance = +receiverAccount.balance + +amount;

      await transactionalEntityManager.save(Account, senderAccount);
      await transactionalEntityManager.save(Account, receiverAccount);

      return [senderAccount, receiverAccount];
    });
  }

  async getAccountByUserId(userId: string): Promise<Account> {
    return this.accountRepository.findOne({ where: { user: { user_id: userId } } });
  }

  private async getAccountByUserId2(userId: string, entityManager: EntityManager): Promise<Account> {
    return entityManager.findOne(Account, {
      where: { user: { user_id: userId } },
      lock: { mode: "pessimistic_write" },
    });
  }

  private async getAccountByUserEmail(UserEmail: string, entityManager: EntityManager): Promise<Account> {
    return entityManager.findOne(Account, {
      where: { user: { email: UserEmail } },
      lock: { mode: "pessimistic_write" },
    });
  }

}