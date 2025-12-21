<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"/>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <template v-if="item.children && item.children.length == 1">
      <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" @click="goRoute">
        <el-icon>
          <component :is="item.children[0].meta.icon"/>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"/>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"/>
    </el-sub-menu>
  </template>
</template>


<script setup lang="ts">
// 获取父组件传递过来的全部路由数组
defineProps(['menuList'])

// @ts-ignore
import {useRouter} from 'vue-router';

let $router = useRouter();

const goRoute = (vc: any) => {
  console.log("点击路由路径：", vc.index);
  $router.push(vc.index);
}
</script>

<script lang="ts">
export default {
  name: 'Menu'
}
</script>

<style scoped>

</style>