
import { Observable } from 'rxjs';
import { FilterModel } from '../models/filter.model';
import { ServerDataSource } from 'ng2-smart-table';

export interface CrudServiceInterface<T> {
  currentPage: number;
  totalPageCount: number;
  itemsPerPage: number;
  toSmartTableDataSource(filter: FilterModel): ServerDataSource;
  $all: (filter?: FilterModel, page?: number, sort?: string, limit?: number) => Observable<T[]>;
  create: (item: T) => Observable<T>;
  get: (uuid: string, filter?: FilterModel) => Observable<T>;
  update: (uuid: string, item: T) => Observable<T>;
}
