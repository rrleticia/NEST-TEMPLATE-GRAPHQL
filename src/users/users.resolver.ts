import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {
  PaginatedOffsetUser,
  PaginatedCursorUser,
} from './models/paginated-users';
import { FetchPageCursorArgs } from '@common/pagination/cursor';
import { FetchPageOffsetArgs } from '@common/pagination/offset';

@Resolver(() => User)
export class UsersResolver {
  constructor(private _usersService: UsersService) {}

  @Query(() => PaginatedOffsetUser, { name: 'usersOffset' })
  async getUsersWithOffset(
    @Args('fetchPageArgs')
    fetchPageArgs: FetchPageOffsetArgs
  ): Promise<PaginatedOffsetUser> {
    const page = await this._usersService.findAllOffSet(fetchPageArgs);
    return page;
  }

  @Query(() => PaginatedCursorUser, { name: 'usersCursor' })
  async getUsersWithCursor(
    @Args('fetchPageArgs')
    fetchPageArgs: FetchPageCursorArgs
  ): Promise<PaginatedCursorUser> {
    const page = await this._usersService.findAllCursor(fetchPageArgs);
    return page;
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<User> {
    return await this._usersService.findOneById(id);
  }

  @Mutation(() => User, { name: 'create' })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return await this._usersService.create(createUserInput);
  }

  @Mutation(() => User, { name: 'update' })
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ): Promise<User> {
    return await this._usersService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean, { name: 'delete' })
  async delete(@Args('id') id: string): Promise<Boolean> {
    return await this._usersService.delete(id);
  }
}
