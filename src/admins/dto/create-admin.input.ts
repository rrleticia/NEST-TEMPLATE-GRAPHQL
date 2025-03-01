import { InputType, Field } from '@nestjs/graphql';
import { GraphQLEmailAddress as Email } from 'graphql-scalars';

export class CreateAdminInput {
  @Field((type) => Email, {
    nullable: false,
    description: `An unique email for the user`,
  })
  email: string;

  @Field((type) => String, {
    nullable: false,
    description: `The password used by the admin to make sensitive changes`,
  })
  admin_password: string;
}
