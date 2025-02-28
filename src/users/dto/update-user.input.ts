import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { GraphQLCuid as CUID } from 'graphql-scalars';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
