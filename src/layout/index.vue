<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{fold:settingStore.fold}">
      <Logo/>
      <!--滚动组件-->
      <el-scrollbar class="scrollbar">
        <el-menu class="menu" :collapse="settingStore.fold" :default-active="$route.path">
          <Menu :menuList="userStore.menuRoutes"/>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{fold:settingStore.fold}">
      <Tabbar/>
    </div>
    <div class="layout_main" :class="{fold:settingStore.fold}">
      <Main/>
    </div>
  </div>

</template>


<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
import useUserStore from "@/store/modules/user";
import useSettingStore from "@/store/modules/setting";
import {useRoute} from "vue-router";
let userStore = useUserStore();
const settingStore = useSettingStore();
const $route = useRoute();

</script>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .menu {
        // 菜单背景颜色
        --el-menu-bg-color: $base-menu-background;
        // 菜单文本颜色
        --el-menu-text-color: white;
        // 鼠标悬念时的菜单背景色
        --el-menu-hover-bg-color: gray;
      }

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    border: 2px solid red ;

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>

