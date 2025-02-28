import { ObjectType } from '@nestjs/graphql';
import { Paginated as PaginatedOffset } from '@common/pagination/offset';
import { Paginated as PaginatedCursor } from '@common/pagination/cursor';
import { User } from './user.model';

@ObjectType()
export class PaginatedOffsetUser extends PaginatedOffset(User) {}

@ObjectType()
export class PaginatedCursorUser extends PaginatedCursor(User) {}
