import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { AsyncMaybe } from '@common/logic/Maybe';
import { User } from '@src/users/models/user.model';

@Injectable()
export abstract class UsersRepository extends BaseRepository<User> {
  abstract findOneByEmail(email: string): AsyncMaybe<User>;
}
