import router from "@/router";
// @ts-ignore
import nprogress from 'nprogress';
// 引入进度条的样式
import "nprogress/nprogress.css"
import useUserStore from "./store/modules/user";
import pinia from "./store";
import RoutePaths from '@/router/routePathConstants'
const routePrefix = import.meta.env.VITE_ROUTE_PREFIX;

nprogress.configure({showSpinner: false})
const userStore = useUserStore(pinia);

router.beforeEach(async (to, from, next) => {
  nprogress.start();

  // 如果路由路径前缀不是正常的前缀，由让其跳转到首页
  if (!to.path.startsWith(routePrefix)) {
    next({path: RoutePaths.HOME});
    return;
  }

  let token = userStore.token;
  let nickName = userStore.nickName;
  if (token) {
    // 用户已登录
    if (to.path == RoutePaths.LOGIN) {
      next({path: RoutePaths.HOME});
    } else {
      if (nickName) {
        next();
      } else {
        try {
          await userStore.userInfo();
          next();
        } catch (error) {
          userStore.logout();
          next({path: RoutePaths.LOGIN, query: {redirect: to.path}});
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == RoutePaths.LOGIN) {
      next();
    } else {
      next({path: RoutePaths.LOGIN, query: {redirect: to.path}});
    }
  }
});

router.afterEach((to, from) => {
  nprogress.done();
})
