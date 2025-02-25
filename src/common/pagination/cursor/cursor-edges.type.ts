import { registerEnumType } from '@nestjs/graphql';

export enum CursorDirection {
  FIRST = 'FIRST',
  LAST = 'LAST',
}

registerEnumType(CursorDirection, {
  name: 'CursorDirection',
  description: 'The supported cursor directions options.',
});

export interface IEdgeType<T> {
  cursor: string;
  node: T;
  direction: CursorDirection;
}
