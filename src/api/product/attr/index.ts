import request from '@/utils/request';
import {ResponseBase} from "@/api/base/types";
import {ProductAttrCategoryEntity, ProductAttrDetailDto} from "@/api/product/attr/types";

enum API {
  QUERY_ATTR_CATEGORY_LIST_URL = '/product/attr/category/list',
  QUERY_ATTR_DETAIL_LIST_URL = '/product/attr/detail/list',
  CREATE_ATTR_DETAIL_URL = '/product/attr/detail/create',
}



export const queryAttrCategoryList = (parentId?: number) => request.get<number, ResponseBase<ProductAttrCategoryEntity[]>>(API.QUERY_ATTR_CATEGORY_LIST_URL, {params: {parentId}});
export const queryAttrDetailList = (categoryId: number) => request.get<number, ResponseBase<ProductAttrDetailDto[]>>(API.QUERY_ATTR_DETAIL_LIST_URL, {params: {categoryId}});
export const createAttrDetail = (detailDto: ProductAttrDetailDto) => request.post<ProductAttrDetailDto, ResponseBase>(API.CREATE_ATTR_DETAIL_URL, detailDto);


