

export interface SysRoleEntity {
  roleId: number | string,
  roleName: string,
  roleKey: string,
  roleSort: number,
  dataScope: string,
  menuCheckStrictly: boolean,
  deptCheckStrictly: boolean,
  status: string,
  delFlag: string,
  remark: string,
  createBy: string | null,
  updateBy: string | null,
  created: Date | null,
  updated: Date | null,
}









