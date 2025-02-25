import { Role } from '@prisma/client';
import { InputType, Field } from '@nestjs/graphql';
import { GraphQLEmailAddress as Email } from 'graphql-scalars';

@InputType()
export class MutateUserInput {
  @Field((type) => Email, {
    nullable: true,
    description: `An unique email for the user`,
  })
  email: string;

  @Field({ nullable: true, description: `A password for the user` })
  password: string;

  @Field({ nullable: true, description: `An unique username for user` })
  username: string;

  @Field({ nullable: true, description: `A name for user` })
  name?: string;
}
