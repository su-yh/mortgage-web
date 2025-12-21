const routePrefix = import.meta.env.VITE_ROUTE_PREFIX;

const RoutePaths = {
  ROOT: routePrefix + '/',
  HOME: routePrefix + '/home',
  LOGIN: routePrefix + '/login',
  SCREEN: routePrefix + '/screen',
  ACL: routePrefix + '/acl',
  ACL_USER: routePrefix + '/acl/user',
  ACL_ROLE: routePrefix + '/acl/role',
  ACL_PERMISSION: routePrefix + '/acl/permission',
  MORTGAGE_MANAGEMENT: routePrefix + '/mortgage',
  MORTGAGE_REPAYMENT: routePrefix + '/repayment',
  MORTGAGE_STATISTICS: routePrefix + '/statistics',
  MORTGAGE_BASE_POINT: routePrefix + '/base/point',
  NOT_FOUND: routePrefix + '/404',
  OTHER: routePrefix + '/:pathMatch(.*)*'
} as const; // 使用as const 让类型更精确

export default RoutePaths;
