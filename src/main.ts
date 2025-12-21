import { createApp } from 'vue'

import App from '@/App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import router from "@/router";
import pinia from "@/store";
import globalComponent from "@/components";

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn
});
app.use(globalComponent);
app.use(router);
app.use(pinia);

import './permission'

app.mount('#app');

console.log("环境变量信息", import.meta.env)
