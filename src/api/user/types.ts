
export interface loginFormData {
  username: string
  password: string
  code: number
}

export interface UserInfoEntity {
  userId: number,
  username: string,
  nickname: string,
  twoFactorAuthKey: string,
  admin: boolean, // 是否admin
  deptId: number,
  parentId: number,
  roleId: number,
  userType: string,
  email:string,
  phonenumber: string,
  sex: string,
  avatar: string,
  status: string,
  dept: object,
}

export interface UserRoleListReqDto {
  userId: number | string,
  roleIds: string[],
}

