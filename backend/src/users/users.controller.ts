import { Body, Controller, Get, Post, Param, Put, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./dtos/user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Get()
    getAllUsers() {
        return this.usersService.getUsers()
    }

    @Get(':id')
    async getAccountById(@Param('id') id: string) {
        const data = await this.usersService.getUserById(id);
        return { data };
    }

    @Get('email/:email')
    async getAccountByEmail(@Param('email') id: string) {
        const data = await this.usersService.getUserByEmail(id);
        return { data };
    }

    @Get('by-token/:token')
    async getUserByToken(@Param('token') token: string) {
        const user = await this.usersService.getUserByToken(token);
        return { user };
    }

    @Put('by-token/:token')
    async updateProfile(@Param('token') token: string, @Body() updatedUserData: UserDto) {
        await this.usersService.updateUserProfile(token, updatedUserData);
        return { message: 'User updated' };
    }

    @Delete('by-token/:token')
    async deleteUserAndAccount(@Param('token') token: string) {
        await this.usersService.deleteUserAndAccountByToken(token);
        return { message: 'User and account deleted' };
    }
}

@Controller('login')
export class LoginController {
    constructor(private usersService: UsersService) { }
    @Post()
    loginUser(@Body() user: UserDto) {
        return this.usersService.login(user)
    }
}

@Controller('signup')
export class SignUpController {
    constructor(private usersService: UsersService) { }
    @Post()
    createUser(@Body() user: UserDto) {
        return this.usersService.signUp(user)
    }
}