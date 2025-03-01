import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const JwtUserId = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const gqplCtx = GqlExecutionContext.create(context);
    const ctx = gqplCtx.getContext();
    const request = ctx.req;
    const userId: String = request.user.id;

    if (userId) {
      return userId;
    } else {
      throw new NotFoundException('User id does not exist in HTTP context');
    }
  }
);
