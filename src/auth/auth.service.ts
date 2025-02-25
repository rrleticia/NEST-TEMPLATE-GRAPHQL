import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AsyncMaybe } from '@common/logic/Maybe';
import { User } from '@src/users/models/user.model';
import { UsersService } from '@src/users/users.service';
import { jwtConstants } from '@common/constants';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UsersService,
    private _jwtService: JwtService,
    private _configService: ConfigService
  ) {}

  getJwtSecret(): string {
    return this._configService.get<string>('jwt.secret');
  }

  getJwtIssuer(): string {
    return this._configService.get<string>('jwt.issuer');
  }

  async validateUser(
    email: string,
    password: string
  ): AsyncMaybe<Partial<User>> {
    const user = await this._userService.findOneByEmail(email);

    if (!user) {
      return undefined;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return undefined;
    }

    return user;
  }

  async login(user: Partial<User>): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const expiresIn = jwtConstants.expiresIn;
    const issuer = this.getJwtIssuer();
    const secret = this.getJwtSecret();

    const options = {
      expiresIn,
      issuer,
      secret,
    };

    const token = await this._jwtService.sign(payload, options);

    return {
      access_token: token,
    };
  }

  verifyToken(token: string): any {
    try {
      const issuer = this.getJwtIssuer();
      const secret = this.getJwtSecret();

      const result = this._jwtService.verify(token, {
        issuer: issuer,
        secret: secret,
      });

      return result;
    } catch (e) {
      throw new BadRequestException(
        'Invalid token was used for authentication'
      );
    }
  }
}
