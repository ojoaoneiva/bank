import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDto, UserOutputDto } from "./dtos/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/User.entity";
import { Account } from "../entities/Account.entity";
import { BadRequestError } from "src/erros/BadRequestError";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv-safe';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

dotenv.config();

function generateUniqueAccountNumber(): string {
    return 'ACCT' + Date.now().toString();
}

@Injectable()
export class UsersService {
    private secretKey: string;

    constructor(
        @InjectRepository(User)
        private users: Repository<User>,
        @InjectRepository(Account)
        private accountsRepository: Repository<Account>,
    ) {
        this.secretKey = process.env.JWT_KEY;
    }

    async getUsers(): Promise<User[]> {
        return this.users.find({ select: ['user_id', 'name', 'email'] });
    }

    async getUserById(id: string): Promise<User[]> {
        return this.users.find({ select: ['user_id', 'name', 'email'], where: { user_id: id } });
    }

    async getUserByEmail(id: string): Promise<User[]> {
        return this.users.find({ select: ['user_id', 'name', 'email'], where: { email: id } });
    }

    async getUserByToken(token: string): Promise<User> {
        try {
            const decoded: JwtPayload = jwt.verify(token, this.secretKey) as JwtPayload;
            const userId = decoded.user_id;
            const user = await this.users.findOne({ select: ['user_id', 'name', 'email'], where: { user_id: userId } });

            if (!user) {
                throw new NotFoundException('User not found.');
            }

            return user;
        } catch (error) {
            throw new BadRequestError('Invalid token.');
        }
    }

    async login(userDto: UserDto): Promise<UserOutputDto> {
        if (!userDto.email || !userDto.password) {
            throw new BadRequestError('Email and password are required fields');
        }

        const existingUser = await this.users.findOne({ where: { email: userDto.email } });

        if (!existingUser) {
            throw new NotFoundException('User not found.');
        }

        const isPasswordValid = await bcrypt.compare(userDto.password, existingUser.password);

        if (!isPasswordValid) {
            throw new BadRequestError('Incorrect password.');
        }

        const token = this.generateJwtToken(existingUser);

        return { message: 'Login successful. Welcome, ' + existingUser.name + '!', token };
    }

    async signUp(user: UserDto): Promise<UserOutputDto> {
        if (!user.email || !user.name || !user.password) {
            throw new BadRequestError('Email, name, and password are required fields');
        }
        if (typeof user.email !== 'string' || typeof user.name !== 'string' || typeof user.password !== 'string') {
            throw new BadRequestError('Name and password must be strings');
        }
        if (!this.isValidEmail(user.email)) {
            throw new BadRequestError('Invalid email');
        }

        const newUser = this.users.create(user);

        const hashedPassword = await bcrypt.hash(newUser.password, 8);
        newUser.password = hashedPassword;

        const savedUser = await this.users.save(newUser);

        const account = this.accountsRepository.create({
            user: savedUser,
            account_number: generateUniqueAccountNumber(),
            balance: 100.0,
        });

        await this.accountsRepository.save(account);

        savedUser.accounts = [account];

        await this.users.save(newUser);

        const token = this.generateJwtToken(newUser);
        return { message: 'Account created successfully. Welcome, ' + newUser.name + '!', token };
    }

    private generateJwtToken(user: User): string {
        const payload = { user_id: user.user_id };
        return jwt.sign(payload, this.secretKey);
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async updateUserProfile(token: string, updatedUserData: UserDto): Promise<User> {
        try {
            const decoded: JwtPayload = jwt.verify(token, this.secretKey) as JwtPayload;
            const userId = decoded.user_id;
            const user = await this.users.findOne({ where: { user_id: userId } });

            if (!user) {
                throw new NotFoundException('User not found.');
            }

            if (updatedUserData.email) {
                user.email = updatedUserData.email;
            }
            if (updatedUserData.name) {
                user.name = updatedUserData.name;
            }

            return this.users.save(user);
        } catch (error) {
            throw new BadRequestError('Invalid token or user not found.');
        }
    }

    async deleteUserAndAccountByToken(token: string): Promise<void> {
        try {
            const decoded: JwtPayload = jwt.verify(token, this.secretKey) as JwtPayload;
            const userId = decoded.user_id;
            const user = await this.users.findOne({ where: { user_id: userId } });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            await this.accountsRepository.delete({ user: { user_id: userId } });
            await this.users.remove(user);

        } catch (error) {
            throw new BadRequestError('Invalid token or user not found.');
        }
    }
}
