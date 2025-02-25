import { Field, InputType } from '@nestjs/graphql';
import { GraphQLCuid as CUID } from 'graphql-scalars';

@InputType()
export class GetUserArgs {
  @Field((type) => CUID, { nullable: false })
  id: string;
}
