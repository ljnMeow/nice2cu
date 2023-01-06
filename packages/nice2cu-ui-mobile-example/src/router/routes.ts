import HomeIndex from '@views/HomeIndex.vue';

export default [
	{
		path: '/',
		redirect: '/homeIndex',
	},
	{
		path: '/homeIndex',
		name: 'HomeIndex',
		component: HomeIndex,
		meta: {
			title: '首页',
		},
	},
	{
		path: '/icon',
		name: 'Icon',
		component: () => import(/* webpackChunkName: "Icon" */ '@views/componentsViews/Icon.vue'),
		meta: {
			title: '图标',
		},
	},
	{
		path: '/button',
		name: 'Button',
		component: () => import(/* webpackChunkName: "Button" */ '@views/componentsViews/Button.vue'),
		meta: {
			title: '按钮',
		},
	},
	{
		path: '/loading',
		name: 'Loading',
		component: () => import(/* webpackChunkName: "Loading" */ '@views/componentsViews/Loading.vue'),
		meta: {
			title: 'Loading',
		},
	},
	{
		path: '/cell',
		name: 'cell',
		component: () => import(/* webpackChunkName: "Cell" */ '@views/componentsViews/Cell.vue'),
		meta: {
			title: '单元格',
		},
	},
	{
		path: '/image',
		name: 'Image',
		component: () => import(/* webpackChunkName: "Image" */ '@views/componentsViews/Image.vue'),
		meta: {
			title: '图片',
		},
	},
	{
		path: '/layout',
		name: 'Layout',
		component: () => import(/* webpackChunkName: "Layout" */ '@views/componentsViews/Layout.vue'),
		meta: {
			title: '布局',
		},
	},
	{
		path: '/badge',
		name: 'Badge',
		component: () => import(/* webpackChunkName: "Badge" */ '@views/componentsViews/Badge.vue'),
		meta: {
			title: '微标',
		},
	},
];
