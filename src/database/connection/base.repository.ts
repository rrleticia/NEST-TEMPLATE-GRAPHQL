import { AsyncMaybe } from '@common/logic/Maybe';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T> {
  abstract findAllOffset(
    order: string,
    limit: number,
    page: number
  ): Promise<any>;
  abstract findAllCursor(
    order: string,
    limit: number,
    after: string
  ): Promise<any>;
  abstract findOneById(id: string): AsyncMaybe<T>;
  abstract create(user: Partial<T>): Promise<T>;
  abstract update(id: string, user: Partial<T>): Promise<T>;
  abstract delete(id: string): AsyncMaybe<T>;
}
