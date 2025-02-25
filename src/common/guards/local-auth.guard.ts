import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const {
      loginInput: { email, password },
    } = ctx.getArgs();

    const gql_req = req;
    gql_req.body.email = email;
    gql_req.body.password = password;

    return gql_req;
  }
}
