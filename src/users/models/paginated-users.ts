import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@common/pagination/offset';
import { User } from './user.model';

@ObjectType()
export class PaginatedUser extends Paginated(User) {}
