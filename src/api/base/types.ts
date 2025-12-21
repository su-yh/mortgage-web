


export interface ResponseBase<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface ListPageParams {
  pageNo: number;
  pageSize: number;
}

export interface PageResult<T> {
  total: number;
  list: Array<T>;
}