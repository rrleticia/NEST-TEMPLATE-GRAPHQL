import { Role } from '@prisma/client';
import {
  Extensions,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  GraphQLCuid as CUID,
  GraphQLDate as Date,
  GraphQLEmailAddress as Email,
} from 'graphql-scalars';

registerEnumType(Role, {
  name: 'Role',
  description: 'The supported user roles.',
});

@ObjectType({ description: 'users' })
export class User {
  @Field((type) => CUID, {
    nullable: false,
    description: `The unique identifier for user`,
  })
  id: string;

  @Field((type) => Email, {
    nullable: false,
    description: `An unique email for the user`,
  })
  email: string;

  @Field({ nullable: true, description: `A password email for the user` })
  password: string;

  @Field({ nullable: false, description: `An unique username for user` })
  username: string;

  @Field({ nullable: true, description: `A name for user` })
  name?: string;

  @Field((type) => [Role], {
    description: `The roles for the user`,
  })
  roles: Role[];

  @Field((type) => Date, {
    nullable: true,
    description: `The createdAt register for the user`,
  })
  // TODO: maybe it doesn't work right now
  @Extensions({ role: Role.ADMIN })
  createdAt: Date;

  @Field((type) => Date, {
    nullable: true,
    description: `The createdAt register for the user`,
  })
  @Extensions({ role: Role.ADMIN })
  updatedAt: Date;
}
