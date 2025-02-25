import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { NewUserInput } from './dto/new-user.input';
import { MutateUserInput } from './dto/mutate-user.input';
import { PaginatedUser } from './models/paginated-users';
import { FetchPageArgs } from '@common/pagination/offset';

@Resolver(() => User)
export class UsersResolver {
  constructor(private _usersService: UsersService) {}

  @Query(() => PaginatedUser, { name: 'users' })
  async getUsers(
    @Args('fetchPageArgs') fetchPageArgs: FetchPageArgs
  ): Promise<PaginatedUser> {
    const page = await this._usersService.findAll(fetchPageArgs);
    return page;
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<User> {
    return await this._usersService.findOneById(id);
  }

  @Mutation(() => User, { name: 'create' })
  async createUser(
    @Args('newUserInput') newUserInput: NewUserInput
  ): Promise<User> {
    return await this._usersService.create(newUserInput);
  }

  @Mutation(() => User, { name: 'update' })
  async updateUser(
    @Args('id') id: string,
    @Args('mutateUserInput') mutateUserInput: MutateUserInput
  ): Promise<User> {
    return await this._usersService.update(id, mutateUserInput);
  }

  @Mutation(() => Boolean, { name: 'delete' })
  async delete(@Args('id') id: string): Promise<Boolean> {
    return await this._usersService.delete(id);
  }
}
