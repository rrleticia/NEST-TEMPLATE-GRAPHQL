import { InputType, Field } from '@nestjs/graphql';
import { GraphQLEmailAddress as Email } from 'graphql-scalars';

@InputType()
export class CreateUserInput {
  @Field((type) => Email, {
    nullable: false,
    description: `An unique email for the user`,
  })
  email: string;

  @Field({ nullable: false, description: `A password email for the user` })
  password: string;

  @Field({ nullable: false, description: `An unique username for user` })
  username: string;

  @Field({ nullable: true, description: `A name for user` })
  name?: string;
}
