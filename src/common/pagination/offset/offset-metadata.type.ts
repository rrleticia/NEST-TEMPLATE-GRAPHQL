import { FetchPageArgs } from './fetch-page-offset.args';

export interface IOffsetMetadataType {
  fetchPageArgs: FetchPageArgs;
  itemCount: number;
}

export class OffsetMetadataType {
  readonly page: number;
  readonly limit: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({ fetchPageArgs, itemCount }: IOffsetMetadataType) {
    this.page = fetchPageArgs.page;
    this.limit = fetchPageArgs.limit;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
