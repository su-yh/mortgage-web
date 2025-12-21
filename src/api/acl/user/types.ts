import {RuoyiEnableStatusEnums} from "@/api/base/enums";
import {ListPageParams} from "@/api/base/types";
import {SysRoleEntity} from "@/api/acl/role/types";

export interface UserListPageParams extends ListPageParams{
  nameLike: string
}

export interface UserInfo {
  sysUserEntity: SysUserEntity,
  roleEntities: SysRoleEntity[],
}
export interface SysUserEntity {
  id: number | string | null,
  username: string,
  nickname: string,
  password: string | null,
  userType: string,
  email: string,
  phonenumber: string,
  sex: string,
  avatar: string,
  status?: RuoyiEnableStatusEnums,
  created?: Date,
  updated?: Date,
}

