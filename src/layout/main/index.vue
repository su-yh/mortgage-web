<template>
<!--  <router-view :v-if="flag"/>-->
  <router-view v-slot="{Component}">
    <transition name="fade">
      <component :is="Component" v-if="flag"/>
    </transition>
  </router-view>
</template>


<script setup lang="ts">
import useSettingStore from "@/store/modules/setting";
import {ref, watch, nextTick} from "vue";
let flag = ref(true);

const settingStore = useSettingStore();
watch(() => settingStore.refresh, () => {
  flag.value = false;
  console.log("watch", settingStore.refresh)
  nextTick(() => {
    flag.value = true;
  })
})
</script>

<script lang="ts">
export default {
  name: 'Main'
}
</script>

<style scoped>

</style>