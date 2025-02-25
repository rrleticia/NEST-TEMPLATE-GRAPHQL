import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { JwtPayloadType } from '@common/types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy._extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: authService.getJwtSecret(),
    });
  }

  private static _extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: any): Promise<JwtPayloadType> {
    return {
      id: payload.sub,
      email: payload.email,
      issuer: payload.iss,
      roles: payload.roles,
    };
  }
}
