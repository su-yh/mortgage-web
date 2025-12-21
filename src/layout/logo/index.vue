<template>
  <div class="logo">
    <img :src="setting.logo" alt="">
    <p>{{setting.title}}</p>
  </div>
</template>


<script setup lang="ts">
import setting from '@/setting'
</script>

<script lang="ts">
export default {
  name: 'Logo'
}
</script>

<style scoped lang="scss">
.logo {
  width: $base-menu-width;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>