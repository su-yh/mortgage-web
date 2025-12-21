import request from '@/utils/request';
import {ListPageParams, ResponseBase, PageResult} from "@/api/base/types";
import {TrademarkEntity} from "@/api/product/trademark/types";

enum API {
  LIST_PAGE_URL = '/product/trademark/listPage',
  CREATE_URL = '/product/trademark/create',
  UPDATE_URL = '/product/trademark/update/byId',
  DELETE_URL = '/product/trademark/delete/byId',
}



export const listPage = (params: ListPageParams) => request.get<any, ResponseBase<PageResult<TrademarkEntity>>>(API.LIST_PAGE_URL, {params});
export const createTrademark = (trademarkEntity: TrademarkEntity) => request.post<TrademarkEntity, ResponseBase>(API.CREATE_URL, trademarkEntity);
export const updateTrademark = (trademarkEntity: TrademarkEntity) => request.post<TrademarkEntity, ResponseBase>(API.UPDATE_URL, trademarkEntity);
export const deleteTrademark = (id: number) => request.post<number, ResponseBase>(API.DELETE_URL, {id});

