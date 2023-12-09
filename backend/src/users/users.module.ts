import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "../entities/User.entity";
import { LoginController, SignUpController, UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountModule } from '../account/account.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), AccountModule],
    providers: [UsersService],
    controllers: [LoginController, SignUpController, UsersController],
    exports: [UsersService],
})
export class UsersModule { }