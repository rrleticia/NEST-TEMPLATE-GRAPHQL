import { registerEnumType } from '@nestjs/graphql';

export enum PaginationOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(PaginationOrder, {
  name: 'PaginationOrder',
  description: 'The supported pagination order options.',
});
