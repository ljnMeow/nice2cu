import { describe, expect, test, vi } from 'vitest';
import { createApp, h } from 'vue';
import { mount } from '@vue/test-utils';

document.body.innerHTML = '<script></script>';

import nNavBar from '../';
import nNavBarVue from '../NavBar.vue';

test('test NavBar plugin', () => {
	const app = createApp({}).use(nNavBar);
	expect(app.component((nNavBar as { name: string }).name)).toBeTruthy();
});

describe('test NavBar props', () => {
	test('test NavBar title', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				title: '标题',
			},
		});
		expect(wrapper.find('.n-nav-bar__title').html()).toContain('标题');
		wrapper.unmount();
	});
	test('test NavBar shadowButtom', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				shadowButtom: true,
			},
		});
		expect(wrapper.find('.n-nav-bar__content').attributes('style')).toMatch(
			'height: 46px; background: #ffffff; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);'
		);
		wrapper.unmount();
	});
	test('test NavBar shadowColor', () => {
		const shadowColor = '#eea2a4';
		const wrapper = mount(nNavBarVue, {
			props: {
				shadowButtom: true,
				shadowColor: shadowColor,
			},
		});
		expect(wrapper.find('.n-nav-bar__content').attributes('style')).toMatch(
			`height: 46px; background: #ffffff; box-shadow: 0px 2px 4px 0px ${shadowColor};`
		);
		wrapper.unmount();
	});
	test('test NavBar Height', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				height: '60px',
			},
		});
		expect(wrapper.find('.n-nav-bar__content').attributes('style')).toMatch(`height: 60px; background: #ffffff;`);
		wrapper.unmount();
	});
	test('test NavBar Background', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				background: '#eea2a4',
			},
		});
		expect(wrapper.find('.n-nav-bar__content').attributes('style')).toMatch(`height: 46px; background: #eea2a4;`);
		wrapper.unmount();
	});
	test('test NavBar TextColor', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				textColor: '#ffffff',
				showLeft: true,
				showRight: true,
			},
		});
		expect(wrapper.find('.n-nav-bar__title').attributes('style')).toMatch(`color: #ffffff`);
		expect(wrapper.find('.n-nav-bar__left-text').attributes('style')).toMatch(`color: #ffffff`);
		expect(wrapper.find('.n-nav-bar__right-text').attributes('style')).toMatch(`color: #ffffff`);
		expect(wrapper.find('.n-icon').attributes('style')).toContain('color: #ffffff;');
		wrapper.unmount();
	});
	test('test NavBar showLeft / showRight', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				showLeft: true,
				showRight: true,
			},
		});
		expect(wrapper.find('.n-nav-bar__left').exists()).toBe(true);
		expect(wrapper.find('.n-nav-bar__right').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test NavBar leftText / leftIcon / rightText / rightIcon', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				showLeft: true,
				showRight: true,
				leftText: '回退',
				leftIcon: 'n-arrow-undo-sharp',
				rightText: '搜索',
				rightIcon: 'n-search',
			},
		});
		expect(wrapper.find('.n-nav-bar__left-text').html()).toContain('回退');
		expect(wrapper.find('.n-arrow-undo-sharp').exists()).toBe(true);
		expect(wrapper.find('.n-nav-bar__right-text').html()).toContain('搜索');
		expect(wrapper.find('.n-search').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test NavBar iconSize', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				showLeft: true,
				iconSize: '30px',
			},
		});
		expect(wrapper.find('.n-icon').attributes('style')).toContain('font-size: 30px');
		wrapper.unmount();
	});
	test('test NavBar classPrefix', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				showLeft: true,
				classPrefix: 'text-classPrefix',
			},
		});
		expect(wrapper.find('.n-icon').classes()).toContain('text-classPrefix');
		wrapper.unmount();
	});
	test('test NavBar fixedTop', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				fixedTop: true,
			},
		});
		expect(wrapper.find('.n-nav-bar__content--fixed-top').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test NavBar placeholder', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				fixedTop: true,
				placeholder: true,
			},
		});
		expect(wrapper.find('.n-nav-bar__content-placeholder').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test NavBar safeAreaInsetTop', () => {
		const wrapper = mount(nNavBarVue, {
			props: {
				safeAreaInsetTop: true,
			},
		});
		expect(wrapper.find('.n-nav-bar--safe-top').exists()).toBe(true);
		wrapper.unmount();
	});
});

describe('test NavBar event', () => {
	test('test NavBar leftClick', () => {
		const leftClick = vi.fn();
		const wrapper = mount(nNavBarVue, {
			props: {
				showLeft: true,
				leftClick: leftClick,
			},
		});
		const leftButton = wrapper.get('.n-nav-bar__left-content');
		leftButton.trigger('click');
		expect(leftClick).toHaveBeenCalledTimes(1);
		wrapper.unmount();
	});
	test('test NavBar rightClick', () => {
		const rightClick = vi.fn();
		const wrapper = mount(nNavBarVue, {
			props: {
				showRight: true,
				rightClick: rightClick,
			},
		});
		const rightButton = wrapper.get('.n-nav-bar__right-content');
		rightButton.trigger('click');
		expect(rightClick).toHaveBeenCalledTimes(1);
		wrapper.unmount();
	});
});

test('test NavBar slot', () => {
	const wrapper = mount(nNavBarVue, {
		props: {
			showLeft: true,
			showRight: true,
		},
		slots: {
			left: () => h('span', { class: 'span-left' }, '左侧'),
			default: () => h('span', { class: 'span-title' }, '标题'),
			right: () => h('span', { class: 'span-right' }, '右侧'),
		},
	});
	expect(wrapper.find('.span-left').exists()).toBe(true);
	expect(wrapper.find('.span-title').exists()).toBe(true);
	expect(wrapper.find('.span-right').exists()).toBe(true);
});
