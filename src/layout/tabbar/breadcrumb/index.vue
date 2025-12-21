<template>
  <div class="bread">
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="settingStore.fold ? Fold : Expand"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="!item.meta.hidden">
        <el-icon>
          <component :is="item.meta.icon"/>
        </el-icon>
        <span>&nbsp;&nbsp;{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>


<script setup lang="ts">
import {Expand, Fold} from "@element-plus/icons-vue";
import useSettingStore from "@/store/modules/setting";
import {useRoute} from "vue-router";

let settingStore = useSettingStore();
const $route = useRoute();

const changeIcon = () => {
  settingStore.fold = !settingStore.fold;
}
</script>

<script lang="ts">
export default {
  name: 'BreadCrumb'
}
</script>

<style scoped lang="scss">
.bread {
  margin-left: 20px;
  display: flex;
}
</style>