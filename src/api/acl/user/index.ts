import request from "@/utils/request";
import {ResponseBase, PageResult} from '@/api/base/types';
import {UserInfo, SysUserEntity} from '@/api/acl/user/types'
import {UserListPageParams} from "./types";


enum API {
  LIST_PAGE_URL = '/user/listPage',
  CREATE_USER_URL = '/user/create',
  UPDATE_USER_URL = '/user/update',
  DELETE_USER_URL = '/user/delete',
}

export const listPage = (userListPageParams: UserListPageParams) => request.get<any, ResponseBase<PageResult<UserInfo>>>(API.LIST_PAGE_URL, {params: userListPageParams});
export const createUser = (entity: SysUserEntity) => request.post<SysUserEntity, ResponseBase<number>>(API.CREATE_USER_URL, entity);
export const updateUser = (entity: SysUserEntity) => request.post<SysUserEntity, ResponseBase<number>>(API.UPDATE_USER_URL, entity);
export const deleteUser = (id: number) => request.post<SysUserEntity, ResponseBase<number>>(API.DELETE_USER_URL, {id});

