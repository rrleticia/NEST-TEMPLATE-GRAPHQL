import { CursorDirection, IEdgeType } from './cursor-edges.type';

export interface ICursorMetadataType<T> {
  limit: number;
  itemCount: number;
  remainCount: number;
  edges: IEdgeType<T>[];
}

export class CursorMetadataType<T> {
  readonly limit: number;
  readonly itemCount: number;
  readonly remainCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
  readonly edges: IEdgeType<T>[];

  constructor({
    limit,
    itemCount,
    remainCount,
    edges,
  }: ICursorMetadataType<T>) {
    this.limit = limit;
    this.itemCount = itemCount;
    this.remainCount = remainCount;
    this.hasPreviousPage = edges.some(
      (edge) => edge.direction === CursorDirection.FIRST
    );
    this.hasNextPage = remainCount > 0;
    this.edges = edges;
  }
}
