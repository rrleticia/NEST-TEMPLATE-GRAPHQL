import { jwtConstants } from '@common/constants';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export default class JwtConfigService implements JwtOptionsFactory {
  constructor(private _configService: ConfigService) {}
  getJwtSecret(): string {
    return this._configService.get<string>('jwt.secret');
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      global: true,
      secret: this.getJwtSecret(),
      signOptions: { expiresIn: jwtConstants.expiresIn },
    };
  }
}
