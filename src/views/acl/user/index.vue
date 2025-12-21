<template>
  <el-card>
    <el-form :inline="true" class="search_form">
      <el-form-item label="用户名：">
        <el-input v-model="nameLike" placeholder="搜索用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="searchUserList">搜索</el-button>
        <el-button type="primary" size="default" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 10px">
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table border style="margin: 10px 0" :data="userList">
      <el-table-column align="center" type="selection"/>
      <el-table-column align="center" label="序号" type="index" width="80px"/>
      <el-table-column align="center" label="id" prop="sysUserEntity.id" width="60px"/>
      <el-table-column align="center" label="用户名字" prop="sysUserEntity.username" show-overflow-tooltip/>
      <el-table-column align="center" label="用户名称" prop="sysUserEntity.nickname" show-overflow-tooltip/>
      <el-table-column align="center" label="用户角色" show-overflow-tooltip>
        <template #default="row, $index">
          <el-tag style="margin-right: 5px" v-for="(item, index) in row.row.roleEntities" :key="item.roleId">
            {{ item.roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" show-overflow-tooltip>
        <template #default="scope">
          {{ formatDate(scope.row.sysUserEntity.created) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" show-overflow-tooltip>
        <template #default="scope">
          {{ formatDate(scope.row.sysUserEntity.updated) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="280px">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="User" @click="setRole(scope.row)">分配角色</el-button>
          <el-button type="primary" size="small" :icon="Edit" @click="editUser(scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除这个用户吗？" @confirm="deleteUserClick(scope.row.sysUserEntity.id)">
            <template #reference>
              <el-button type="danger" size="small" :icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[1, 5, 7, 9, 10]"
        :size="'default'"
        :background="true"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="pageTotal"
        @currentChange="searchUserList"
        @sizeChange="sizeChangeHandle"
    />
  </el-card>

  <el-drawer v-model="drawerUser">
    <template #header>
      <h4>{{ drawerUserTitle }}</h4>
    </template>
    <template #default>
      <el-form label-width="80px">
        <el-form-item label="用户名：">
          <template #default>
            <el-input v-model="drawerUserEntity.username" placeholder="请输入用户名"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="昵称：">
          <template #default>
            <el-input v-model="drawerUserEntity.nickname" placeholder="请输入昵称"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="密码：">
          <template #default>
            <el-input v-model="drawerUserEntity.password" type="password" placeholder="请输入密码"></el-input>
          </template>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelUserClick">取消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </div>
    </template>
  </el-drawer>

  <el-drawer v-model="drawerRole">
    <template #header>
      <h4>分配用户角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户昵称">
          <template #default>
            <el-input v-model="drawerUserEntity.nickname" :disabled="true"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox v-model="checkAllRoles" @change="handleCheckAllRolesChange" :indeterminate="isRoleIndeterminate">全选</el-checkbox>
          <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(role, index) in allRoles" :key="role.roleId" :label="role.roleName" :value="role">
              {{role.roleName}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelSetRole">取消</el-button>
        <el-button @click="saveSetRole" type="primary">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ResponseBase} from '@/api/base/types';
import {createUser, updateUser, deleteUser, listPage} from "@/api/acl/user";
import {UserInfo, UserListPageParams, SysUserEntity} from '@/api/acl/user/types'
import {listAll as listAllRoles} from '@/api/acl/role';
import {ElMessage} from "element-plus";
import {Delete, Edit, User} from "@element-plus/icons-vue";
import type { CheckboxValueType } from 'element-plus'
import {SysRoleEntity} from "@/api/acl/role/types";
import {bindUserRoles} from "@/api/user";
import {UserRoleListReqDto} from "@/api/user/types";

enum DrawerCategory {
  CREATE,
  UPDATE,
}

let pageNo = ref<number>(1);
let pageSize = ref<number>(5);
let pageTotal = ref<number>(0);
let userList = ref<UserInfo[]>([]);
let nameLike = ref<string>('');
let drawerUser = ref<boolean>(false); // 用户抽屉
let drawerUserEntity = ref<SysUserEntity>({
  id: null, username: '', nickname: '', password: '', userType: '', email: '', phonenumber: '',
  sex: '', avatar: ''
});
const drawerUserCategory = ref<DrawerCategory>(DrawerCategory.CREATE);
let drawerUserTitle = ref<string>('');

let drawerRole = ref<boolean>(false); // 角色抽屉
// 是否全选状态
const checkAllRoles = ref(false);
// 所有的复选框的值
const allRoles = ref<SysRoleEntity[]>([]);
// 当前勾选上的复选框的值
const checkedRoles = ref<SysRoleEntity[]>([]);
// 全选的不确定状态：非0 非all 则为true
const isRoleIndeterminate = ref(true);

const searchUserList = async () => {
  const userListPageParams: UserListPageParams = {
    pageNo: pageNo.value, pageSize: pageSize.value, nameLike: nameLike.value
  };
  const result = await listPage(userListPageParams);
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }

  if (result.data.list == null) {
    result.data.list = [];
  }

  pageTotal.value = result.data.total;
  userList.value = result.data.list;
}

const resetSearch = async () => {
  nameLike.value = '';
  await searchUserList();
}

const sizeChangeHandle = () => {
  searchUserList();
}

onMounted(() => {
  searchUserList();
})

const formatDate = (date: Date | string | number) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 添加用户按钮回调
const addUser = () => {
  drawerUser.value = true;
  drawerUserCategory.value = DrawerCategory.CREATE;
  drawerUserTitle.value = '添加用户';

  drawerUserEntity.value = {
    id: null, username: '', nickname: '', password: '', userType: '', email: '', phonenumber: '',
    sex: '', avatar: ''
  };
}

const setRole = async (userInfo: UserInfo) => {
  const result = await listAllRoles();
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }

  drawerRole.value = true;
  drawerUserEntity.value = {...userInfo.sysUserEntity};

  if (result.data == null) {
    result.data = [];
  }

  allRoles.value = result.data;

  // 当前选择用户拥有的所有角色
  checkedRoles.value = [];
  let roleEntities: SysRoleEntity[] = userInfo.roleEntities;
  if (!roleEntities) {
    roleEntities = [];
  }
  for (let i = 0; i < roleEntities.length; i++) {
    const role = roleEntities[i];
    checkedRoles.value.push({...role });
  }
  const checkedCount = checkedRoles.value.length
  isRoleIndeterminate.value = checkedCount > 0 && checkedCount < allRoles.value.length
}

const editUser = (userInfo: UserInfo) => {
  drawerUser.value = true;
  drawerUserCategory.value = DrawerCategory.UPDATE;
  drawerUserTitle.value = '修改用户';

  drawerUserEntity.value = {...userInfo.sysUserEntity};
}

const deleteUserClick = async (id: number) => {
  console.log("deleteUser: ", id);
  const result = await deleteUser(id);
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }

  await searchUserList();
}

const cancelUserClick = () => {
  drawerUser.value = false;
}

const saveUser = async () => {
  let result: ResponseBase<number> | null = null;
  let messagePrev = '';
  switch (drawerUserCategory.value) {
    case DrawerCategory.CREATE:
      result = await createUser(drawerUserEntity.value);
      messagePrev = '添加';
      break
    case DrawerCategory.UPDATE:
      console.log("drawerUserEntity: ", drawerUserEntity.value)
      if (!drawerUserEntity.value.password) {
        drawerUserEntity.value.password = null;
      }
      result = await updateUser(drawerUserEntity.value);
      messagePrev = '更新';
      break
    default:
      break;
  }
  if (result == null) {
    ElMessage({
      type: "error",
      message: 'result is null',
    })
    return;
  }
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }

  ElMessage({
    type: "success",
    message: messagePrev + '成功',
  })

  await searchUserList();

  drawerUser.value = false;
}

const handleCheckAllRolesChange = (val: CheckboxValueType) => {
  checkedRoles.value = val ? allRoles.value : []
  isRoleIndeterminate.value = false
}

const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  checkAllRoles.value = checkedCount === allRoles.value.length
  isRoleIndeterminate.value = checkedCount > 0 && checkedCount < allRoles.value.length
}

const cancelSetRole = () => {
  drawerRole.value = false;
}

const saveSetRole = async () => {
  console.log("current username: ", drawerUserEntity.value.username)
  console.log("current nickname: ", drawerUserEntity.value.nickname)
  for (let i = 0; i < checkedRoles.value.length; i++) {
    console.log("current checked items: ", checkedRoles.value[i].roleName)
  }

  let userRoleListReqDto: UserRoleListReqDto = {
    userId: drawerUserEntity.value.id as string,
    roleIds: []
  }

  for (let i = 0; i < checkedRoles.value.length; i++) {
    userRoleListReqDto.roleIds.push(checkedRoles.value[i].roleId as string);
  }

  const result: ResponseBase<number> = await bindUserRoles(userRoleListReqDto)
  if (result.code != 0) {
    ElMessage({
      type: 'error',
      message: result.message
    })
    return;
  }

  // 隐藏设置角色的抽屉
  drawerRole.value = false;

  await searchUserList()
}

</script>

<script lang="ts">
export default {
  name: 'User'
}
</script>

<style scoped lang="scss">
.search_form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>