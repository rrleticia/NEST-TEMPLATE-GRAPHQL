import { InputType, Field } from '@nestjs/graphql';
import { GraphQLEmailAddress as Email } from 'graphql-scalars';

@InputType()
export class LoginInput {
  @Field((type) => Email, {
    nullable: false,
    description: `An unique email for the user`,
  })
  email: string;

  @Field({ nullable: false, description: `A password for the user` })
  password: string;
}
