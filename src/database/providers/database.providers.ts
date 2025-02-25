import { UsersRepository } from '../connection/user.repository';
import { PrismaUsersRepository } from '../prisma/repositories/prisma-user.repository';

export const USER_PROVIDER = {
  provide: UsersRepository,
  useClass: PrismaUsersRepository,
};
