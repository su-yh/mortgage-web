<template>
  <div class="tabbar">
    <Breadcrumb/>
    <Setting/>
  </div>
</template>


<script setup lang="ts">
import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
import Setting from '@/layout/tabbar/setting/index.vue'
</script>

<script lang="ts">
export default {
  name: 'Tabbar'
}
</script>

<style scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>