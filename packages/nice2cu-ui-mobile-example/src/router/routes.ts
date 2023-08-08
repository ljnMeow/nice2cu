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
	{
		path: '/navbar',
		name: 'NavBar',
		component: () => import(/* webpackChunkName: "NavBar" */ '@views/componentsViews/NavBar.vue'),
		meta: {
			title: '导航栏',
		},
	},
	{
		path: '/bottomNavBar',
		redirect: '/bottomNavBar/page1',
		name: 'BottomNavBar',
		component: () => import(/* webpackChunkName: "BottomNavBar" */ '@views/componentsViews/BottomNavBar.vue'),
		children: [
			{
				path: 'page1',
				component: () => import(/* webpackChunkName: "Page1" */ '@views/componentsViews/BottomNavBarJumpPage/Page1.vue'),
			},
			{
				path: 'page2',
				component: () => import(/* webpackChunkName: "Page1" */ '@views/componentsViews/BottomNavBarJumpPage/Page2.vue'),
			},
			{
				path: 'page3',
				component: () => import(/* webpackChunkName: "Page1" */ '@views/componentsViews/BottomNavBarJumpPage/Page3.vue'),
			},
			{
				path: 'page4',
				component: () => import(/* webpackChunkName: "Page1" */ '@views/componentsViews/BottomNavBarJumpPage/Page4.vue'),
			},
			{
				path: 'page5',
				component: () => import(/* webpackChunkName: "Page1" */ '@views/componentsViews/BottomNavBarJumpPage/Page5.vue'),
			},
		],
		meta: {
			title: '底部导航栏',
		},
	},
	{
		path: '/sticky',
		name: 'Sticky',
		component: () => import(/* webpackChunkName: "Sticky" */ '@views/componentsViews/Sticky.vue'),
		meta: {
			title: '粘性布局',
		},
	},
	{
		path: '/space',
		name: 'Space',
		component: () => import(/* webpackChunkName: "Space" */ '@views/componentsViews/Space.vue'),
		meta: {
			title: '间距',
		},
	},
	{
		path: '/tabs',
		name: 'Tabs',
		component: () => import(/* webpackChunkName: "Tabs" */ '@views/componentsViews/Tabs.vue'),
		meta: {
			title: '标签页',
		},
	},
];
