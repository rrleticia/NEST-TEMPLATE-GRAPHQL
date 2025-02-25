import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './models/user.model';
import { NewUserInput } from './dto/new-user.input';
import { MutateUserInput } from './dto/mutate-user.input';
import { UsersRepository } from '@src/database/connection/user.repository';
import { PaginatedUser } from './models/paginated-users';
import { FetchPageArgs, OffsetMetadataType } from '@common/pagination/offset';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly _configService: ConfigService
  ) {}

  private getSaltRounds(): string {
    return this._configService.get<string>('bycrypt.saltRounds');
  }

  async findAll(fetchPageArgs: FetchPageArgs): Promise<any> {
    try {
      const { order, page, limit } = fetchPageArgs;

      const { users, itemCount } = await this.usersRepository.findAll(
        order,
        page,
        limit
      );

      const metadataOffset = new OffsetMetadataType({
        fetchPageArgs,
        itemCount,
      });

      return { data: users, meta: metadataOffset } as PaginatedUser;
    } catch (error) {}
  }

  // async findAllCursor(fetchPageArgs: FetchPageArgs): Promise<any> {
  //   try {
  //     const { order, page, limit } = fetchPageArgs;

  //     const { users, itemCount, remainCount, edges } =
  //       await this.usersRepository.findAll(order, page, limit);

  //     const metadataCursor = new CursorMetadataType({
  //       limit,
  //       itemCount,
  //       remainCount,
  //       edges,
  //     });

  //     return { data: users, meta: metadataCursor } as PaginatedUser;
  //   } catch (error) {}
  // }

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

  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneById(id);

      if (!user) {
        throw new NotFoundException('The user does not exist in the database');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(rawUserInput: NewUserInput): Promise<User> {
    try {
      const newUserInput = await this._hashPassword(rawUserInput);

      const user = await this.usersRepository.create(newUserInput);

      return user;
    } catch (error) {}
  }

  async update(id: string, mutateUserInput: MutateUserInput): Promise<User> {
    try {
      const user = await this.usersRepository.update(id, mutateUserInput);
      return user;
    } catch (error) {}
  }

  async delete(id: string): Promise<Boolean> {
    try {
      await this.usersRepository.delete(id);
      return true;
    } catch (error) {}
  }

  private async _hashPassword(user: NewUserInput): Promise<NewUserInput> {
    try {
      const password = user.password;

      if (!password) {
        throw new BadRequestException(
          'Invalid input for password field of User.'
        );
      }

      const saltRounds = this.getSaltRounds();

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      user.password = hashedPassword;

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
