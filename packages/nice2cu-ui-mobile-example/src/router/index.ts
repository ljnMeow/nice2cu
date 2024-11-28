import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior() {
		return { top: 0 };
	},
});

router.beforeEach((to, _from, next) => {
	window.parent.postMessage({ type: 'changePath', path: to.fullPath }, '*');
	next();
});

export default router;
