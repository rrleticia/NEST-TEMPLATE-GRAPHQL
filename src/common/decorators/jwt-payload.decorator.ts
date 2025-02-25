import { JwtPayloadType } from '@common/types/jwt-payload.type';
import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const JwtPayload = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const gqplCtx = GqlExecutionContext.create(context);
    const ctx = gqplCtx.getContext();
    const request = ctx.req;
    const jwtPayload: JwtPayloadType = request.user;

    if (jwtPayload) {
      return jwtPayload;
    } else {
      throw new NotFoundException('JwtPayload does not exist in HTTP context');
    }
  }
);
