import { Roles } from '@common/roles';
import { Mutation, Args, Resolver } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { User } from '@src/users/models/user.model';
import { AdminsService } from './admins.service';
import { CreateAdminInput } from './dto/create-admin.input';

@Roles(Role.ADMIN)
@Resolver(() => User)
export class AdminsResolver {
  constructor(private _adminsService: AdminsService) {}

  @Mutation(() => User, { name: 'admin' })
  async create(
    @Args('createAdminInput') createAdminInput: CreateAdminInput
  ): Promise<User> {
    const { email, admin_password } = createAdminInput;
    return await this._adminsService.create(email, admin_password);
  }
}
