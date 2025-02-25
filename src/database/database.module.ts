import { Module } from '@nestjs/common';
import { UsersRepository } from './connection/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { USER_PROVIDER } from './providers/database.providers';
import { HMACCursorService } from '@common/pagination/hmac-cursor.service';

@Module({
  imports: [],
  providers: [HMACCursorService, PrismaService, USER_PROVIDER],
  exports: [PrismaService, UsersRepository],
})
export class DatabaseModule {}
