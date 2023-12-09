import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
  constructor(private transferService: TransferService) { }

  @Get(':id')
  async getTransferById(@Param('id') id: any) {
    const data = await this.transferService.getTransferById(id);
    return { data };
  }

  @Post()
  async transfer(
    @Body('fromUserId') fromUserId: string,
    @Body('toUserId') toUserId: string,
    @Body('amount') amount: number,
  ): Promise<{ message: string }> {
    await this.transferService.transfer(fromUserId, toUserId, amount);
    return { message: 'Transfer successful' };
  }
}