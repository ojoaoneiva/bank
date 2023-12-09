import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { AccountService } from "./account.service";

@Controller('account')
export class AccountsController {
  constructor(private accountService: AccountService) { }
  @Get()
  getAllAccounts() {
    return this.accountService.getAccounts()
  }

  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    const data = await this.accountService.getAccountByUserId(id);
    return { data };
  }

  @Post()
  async transfer(
    @Body('fromUserId') fromUserId: string,
    @Body('toUserEmail') toUserEmail: string,
    @Body('amount') amount: number,
  ): Promise<any> {
    try {
      const [senderAccount, receiverAccount] = await this.accountService.transfer(fromUserId, toUserEmail, amount);
      return { message: 'Transfer successful', senderAccount, receiverAccount };
    } catch (error) {
      return { error: error.message };
    }
  }

}