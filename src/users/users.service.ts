import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from '@src/database/connection/user.repository';
import {
  PaginatedOffsetUser,
  PaginatedCursorUser,
} from './models/paginated-users';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { argonConstants } from '@common/constants';
import { BaseService } from '@common/base/base.service';

@Injectable()
export class UsersService extends BaseService<
  User,
  CreateUserInput,
  UpdateUserInput,
  PaginatedOffsetUser,
  PaginatedCursorUser
> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly _configService: ConfigService
  ) {
    super(usersRepository);
  }

  // Domain-specific method to find a user by email.
  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneByEmail(email);
      if (!user) {
        throw new NotFoundException('The user does not exist in the database');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Override the generic create method to include password hashing.
  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const newUserInput = await this._hashPassword(createUserInput);
      return await this.usersRepository.create(newUserInput);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Private helper for password hashing.
  private async _hashPassword(user: CreateUserInput): Promise<CreateUserInput> {
    try {
      const password = user.password;
      if (!password) {
        throw new BadRequestException(
          'Invalid input for password field of User.'
        );
      }
      const hashedPassword = await argon2.hash(password, argonConstants);
      user.password = hashedPassword;
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
