import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaginationOrder } from '@common/enums/pagination-order.enum';
import { UsersRepository } from '@src/database/connection/user.repository';
import { Role } from '@prisma/client';
import { User } from '@src/users/models/user.model';
import { AsyncMaybe } from '@common/logic/Maybe';
import { HMACCursorService } from '@common/pagination/hmac-cursor.service';
import {
  CursorDirection,
  IEdgeType,
} from '@common/pagination/cursor/cursor-edges.type';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hmacCursorService: HMACCursorService
  ) {}

  async findAll(
    order: PaginationOrder,
    limit: number,
    page: number
  ): Promise<any> {
    const skip = (page - 1) * limit;
    const sort = order == PaginationOrder.ASC ? 'asc' : 'desc';

    const users = await this.prisma.user.findMany({
      where: {
        roles: { has: Role.USER },
      },
      orderBy: {
        createdAt: sort,
      },
      skip: skip,
      take: limit,
    });

    const itemCount = await this.prisma.user.count({
      where: {
        roles: { has: Role.USER },
      },
    });

    return { users, itemCount };
  }

  async findAllCursor(
    order: PaginationOrder,
    limit: number,
    after?: string
  ): Promise<any> {
    const sort = order == PaginationOrder.ASC ? 'asc' : 'desc';
    const cursor = this.hmacCursorService.decodeCursor(after);

    const users = await this.prisma.user.findMany({
      where: {
        roles: { has: Role.USER },
      },
      orderBy: {
        createdAt: sort,
      },
      skip: after ? 1 : 0,
      take: limit,
      cursor: after ? { id: cursor } : undefined,
    });

    const itemCount = await this.prisma.user.count({
      where: {
        roles: { has: Role.USER },
      },
    });

    const firstUser = users.length > 0 ? users[0] : undefined;
    const lastUser = users.length > 0 ? users[users.length - 1] : undefined;

    let remainCount = 0;

    if (lastUser) {
      remainCount = await this.prisma.user.count({
        where: { roles: { has: Role.USER } },
        orderBy: {
          createdAt: sort,
        },
        cursor: { id: lastUser.id },
        skip: 1,
      });
    }

    let edges: IEdgeType<User>[] = [];
    edges[0] = {
      cursor: this.hmacCursorService.encodeCursor(firstUser.id),
      node: firstUser,
      direction: CursorDirection.FIRST,
    };
    edges[1] = {
      cursor: this.hmacCursorService.encodeCursor(firstUser.id),
      node: firstUser,
      direction: CursorDirection.FIRST,
    };

    return { users, itemCount, remainCount, edges };
  }

  async findOneByEmail(email: string): AsyncMaybe<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      omit: {
        password: false,
      },
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async findOneById(id: string): AsyncMaybe<User> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async create(data: User): Promise<User> {
    data.roles = [Role.USER];

    const user = await this.prisma.user.create({
      data: data,
    });

    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: data,
    });

    return user;
  }

  async delete(id: string): AsyncMaybe<User> {
    const user = await this.prisma.user.delete({ where: { id: id } });

    if (!user) {
      return undefined;
    }
    return user;
  }
}
