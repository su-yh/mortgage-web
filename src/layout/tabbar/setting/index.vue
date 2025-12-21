<template>
  <div class="setting">
    <el-button icon="Refresh" size="default" circle @click="activeRefresh"/>
    <el-button icon="FullScreen" size="default" circle/>
    <el-button icon="Setting" size="default" circle/>
    <img :src="userStore.avatar" alt="#" style="width: 40px; margin: 0 10px">
    <el-dropdown>
        <span class="el-dropdown-link">
          {{userStore.nickName}}
          <el-icon class="el-icon--right">
            <ArrowDown/>
          </el-icon>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>


<script setup lang="ts">
import {ArrowDown} from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/user";
import RoutePaths from "@/router/routePathConstants";
import useSettingStore from "@/store/modules/setting";
import {useRouter, useRoute} from "vue-router";
const userStore = useUserStore();
const settingStore = useSettingStore();
const $router = useRouter();
const $route = useRoute();

const activeRefresh = () => {
  settingStore.refresh++;
}
const logout = () => {
  userStore.logout();

  $router.push({path: RoutePaths.LOGIN, query: {redirect: $route.path}});
}
</script>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<style scoped lang="scss">

.setting {
  display: flex;
  align-items: center;

  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
}
</style>
