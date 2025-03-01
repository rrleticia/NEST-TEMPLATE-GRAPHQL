import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';
import { UsersRepository } from '@src/database/connection/user.repository';
import { User } from '@src/users/models/user.model';
import * as argon2 from 'argon2';

@Injectable()
export class AdminsService {
  constructor(
    private readonly _usersRepository: UsersRepository,
    private _configService: ConfigService
  ) {}

  private getAdminPassword(): string {
    return this._configService.get<string>('jwt.secret');
  }

  async create(email: string, admin_password: string): Promise<User> {
    const user = await this._usersRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('Unable to retrieve user based on email');
    }

    const correct_password = this.getAdminPassword();

    const isMatch = await argon2.verify(admin_password, correct_password);

    if (!isMatch) {
      throw new ForbiddenException('The password was not authorized');
    }

    const adminRoles = user.roles;
    adminRoles.push(Role.ADMIN);

    const admin = await this._usersRepository.update(user.id, {
      roles: adminRoles,
    });

    return admin;
  }
}
