import * as VueRouter from 'vue-router';
import App from './App.vue'

var routes = [];

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