// 关于layout 组件相关配置仓库
import {defineStore} from "pinia";


let useSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      // 用于控制菜单折叠还是展开
      fold: false,
      refresh: 0
    };
  },
});

export default useSettingStore;
