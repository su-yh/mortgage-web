import request from '@/utils/request';
import {ListPageParams, ResponseBase, PageResult} from "@/api/base/types";
import {MortgageRepaymentEntity} from "./types";

enum API {
  MORTGAGE_REPAYMENT_PAGE_LIST_URL = '/mortgage/repayment/page/list',
  MORTGAGE_REPAYMENT_CREATE_URL = '/mortgage/repayment/create',
  MORTGAGE_REPAYMENT_UPDATE_URL = '/mortgage/repayment/update',
  MORTGAGE_REPAYMENT_DELETE_URL = '/mortgage/repayment/delete',
}

export const pageListMortgageRepayment = (params: ListPageParams)  => request.get<any, ResponseBase<PageResult<MortgageRepaymentEntity>>>(API.MORTGAGE_REPAYMENT_PAGE_LIST_URL, {params});
export const createMortgageRepayment = (entity: MortgageRepaymentEntity) => request.post<MortgageRepaymentEntity, ResponseBase<number>>(API.MORTGAGE_REPAYMENT_CREATE_URL, entity);
export const updateMortgageRepayment = (entity: MortgageRepaymentEntity) => request.post<MortgageRepaymentEntity, ResponseBase<number>>(API.MORTGAGE_REPAYMENT_UPDATE_URL, entity);
export const deleteMortgageRepayment = (id: number) => request.post<MortgageRepaymentEntity, ResponseBase<number>>(API.MORTGAGE_REPAYMENT_DELETE_URL, {}, {params: {id}});

