import { Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {
  PaginatedOffsetUser,
  PaginatedCursorUser,
} from './models/paginated-users';
import { UsersService } from './users.service';
import { FetchPageOffsetArgs } from '@common/pagination/offset';
import { FetchPageCursorArgs } from '@common/pagination/cursor';
import { BaseResolverFactory } from '@common/base/base.resovler';

// Create a base class with all generic resolver methods.
const UsersBaseResolver = BaseResolverFactory<
  User,
  CreateUserInput,
  UpdateUserInput,
  PaginatedOffsetUser,
  PaginatedCursorUser,
  FetchPageOffsetArgs,
  FetchPageCursorArgs
>(
  () => User, // Object type for the model
  () => CreateUserInput, // Create input type
  () => UpdateUserInput, // Update input type
  () => PaginatedOffsetUser, // Paginated offset type
  () => PaginatedCursorUser, // Paginated cursor type
  () => FetchPageOffsetArgs, // Offset arguments type
  () => FetchPageCursorArgs // Cursor arguments type
);

// Now, decorate the concrete resolver with @Resolver.
@Resolver(() => User)
export class UsersResolver extends UsersBaseResolver {
  constructor(usersService: UsersService) {
    super(usersService);
  }
}
