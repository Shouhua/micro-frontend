import * as VueRouter from 'vue-router';

var routes = [
];

// require.context自动化注册所有路由配置
// const requireComponent = require.context('@/modules', true, /\.router.js$/);

// requireComponent.keys().forEach((fileName) => {
//   const routerConfig = requireComponent(fileName);
//   routes.push(...routerConfig.default);
// });

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
  routes
});

export default router;