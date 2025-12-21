import request from '@/utils/request'
import {ResponseBase} from "@/api/base/types";
import {SysRoleEntity} from "@/api/acl/role/types";

enum API {
  LIST_ALL_URL = '/role/listAll',
  CREATE_URL = '/role/create',
  UPDATE_URL = '/role/update',
  DELETE_URL = '/role/delete',
}

export const listAll = () => request.get<any, ResponseBase<SysRoleEntity[]>>(API.LIST_ALL_URL);
export const createRole = (entity: SysRoleEntity) => request.post<SysRoleEntity, ResponseBase<number>>(API.CREATE_URL, entity);



