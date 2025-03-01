import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@src/users/models/user.model';
import { AuthService } from './auth.service';
import { UsersService } from '@src/users/users.service';
import { JwtPayload, SkipAuth } from '@common/decorators';
import { JwtPayloadType } from '@common/types/jwt-payload.type';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@common/guards';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { LoginInput } from './dto/login.input';
import { ExpireDate } from '@common/util';
import { jwtConstants } from '@common/constants';
import { LoginResponse } from './dto/login.response';

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    private _authService: AuthService,
    private _usersService: UsersService
  ) {}

  @Query((returns) => User, { name: 'profile' })
  async profile(@JwtPayload() jwtPayload: JwtPayloadType): Promise<User> {
    return await this._usersService.findOneById(jwtPayload.id);
  }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Mutation((returns) => LoginResponse, { name: 'login' })
  async login(
    @Args('loginInput') _: LoginInput,
    @JwtPayload() jwtPayload: JwtPayloadType,
    @Context() ctx: any
  ): Promise<LoginResponse> {
    const { res } = ctx;

    const { access_token } = await this._authService.login(jwtPayload);

    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: ExpireDate(jwtConstants.expiresInNum),
      })
      .status(200);

    return {
      code: 200,
      status: 'User successfully logged in.',
      timestamp: new Date(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => LoginResponse, { name: 'logout' })
  async logout(@Context() ctx): Promise<LoginResponse> {
    const { res } = ctx;
    res
      .clearCookie('access_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      })
      .status(200);

    return {
      code: 200,
      status: 'User successfully logged out.',
      timestamp: new Date(),
    };
  }
}
