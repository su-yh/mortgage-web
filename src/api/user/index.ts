import request from "@/utils/request";
import {loginFormData, UserInfoEntity, UserRoleListReqDto} from "./types";
import {ResponseBase} from '@/api/base/types';

enum API {
  LOGIN_URL = '/user/login',
  LOGOUT_URL = '/user/logout',
  USERINFO_URL = '/user/info',
  BIND_USER_ROLES_URL = '/role/update/user/roleList',
}

export const reqLogin = (data: loginFormData) => request.post<loginFormData, ResponseBase<string>>(API.LOGIN_URL, data);
export const reqLogout = () => request.post<any, ResponseBase>(API.LOGOUT_URL);
export const reqUserInfo = () => request.get<any, ResponseBase<UserInfoEntity>>(API.USERINFO_URL);
export const bindUserRoles = (data: UserRoleListReqDto) => request.post<UserRoleListReqDto, ResponseBase<number>>(API.BIND_USER_ROLES_URL, data);
