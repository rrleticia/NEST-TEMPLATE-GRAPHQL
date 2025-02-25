import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field((type) => Int, { nullable: true })
  code: number;

  @Field((type) => String, { nullable: true })
  status: string;

  @Field((type) => Date, { nullable: true })
  timestamp: Date;
}
