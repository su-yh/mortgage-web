import type {RouteRecordRaw} from "vue-router";
import RoutePaths from '@/router/routePathConstants'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: RoutePaths.ROOT,
    component: () => import('@/layout/index.vue'),
    redirect: RoutePaths.HOME,
    name: 'root',
    meta: {
      title: '根',
      hidden: true,
      icon: "Promotion",
    },
    children: [
      {
        path: RoutePaths.HOME,
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '主页',
          hidden: false,
          icon: "Promotion",
        },
      }
    ]
  }, {
    path: RoutePaths.LOGIN,
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
      icon: "Promotion",
    }
  }, {
    path: RoutePaths.ACL,
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: "Lock",
    },
    children: [
      {
        path: RoutePaths.ACL_USER,
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: "User",
        },
      }, {
        path: RoutePaths.ACL_ROLE,
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: "UserFilled",
        },
      }, {
        path: RoutePaths.ACL_PERMISSION,
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: "Monitor",
        },
      }
    ]
  }, {
    path: RoutePaths.MORTGAGE_MANAGEMENT,
    component: () => import('@/layout/index.vue'),
    name: '房贷管理',
    meta: {
      title: '房贷管理',
      hidden: false,
      icon: "Lock",
    },
    children: [
      {
        path: RoutePaths.MORTGAGE_REPAYMENT,
        component: () => import('@/views/mortgage/repayment/index.vue'),
        name: 'Repayment',
        meta: {
          title: '还款记录',
          hidden: false,
          icon: "User",
        },
      }, {
        path: RoutePaths.MORTGAGE_STATISTICS,
        component: () => import('@/views/mortgage/statistics/index.vue'),
        name: 'Statistics',
        meta: {
          title: '还款统计',
          hidden: false,
          icon: "User",
        },
      }, {
        path: RoutePaths.MORTGAGE_BASE_POINT,
        component: () => import('@/views/mortgage/bp/index.vue'),
        name: 'BP',
        meta: {
          title: '基点配置',
          hidden: false,
          icon: "User",
        },
      }
    ]
  }, {
    path: RoutePaths.NOT_FOUND,
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: "Promotion",
    }
  }, {
    path: RoutePaths.OTHER,
    redirect: RoutePaths.NOT_FOUND,
    name: 'Any',
    meta: {
      title: 'any',
      hidden: true,
      icon: "Promotion",
    }
  }
];

export default constantRoutes;



