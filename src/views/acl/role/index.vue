<template>
  <div>
    <h1>角色管理</h1>
    <el-button @click="handlerCreateRole">创建角色</el-button>
  </div>
</template>


<script setup lang="ts">
import {createRole} from '@/api/acl/role'
import {SysRoleEntity} from "@/api/acl/role/types";
import {ElMessage} from "element-plus";

const handlerCreateRole = async () => {
  // TODO: suyh - 这里完全是测试用的代码。
  let entity: SysRoleEntity = {
    roleId: '', roleName: 'roleName', roleKey: '', roleSort: 0, dataScope: '',
    menuCheckStrictly: false, deptCheckStrictly: false, status: '0', delFlag: '', remark: '',
    createBy: null, updateBy: null, created: null, updated: null
  };
  console.log("创建角色中开始");
  const result = await createRole(entity);
  console.log("创建角色中的 result: ", result);
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }
}
</script>

<script lang="ts">
export default {
  name: 'Role'
}
</script>

<style scoped>

</style>
