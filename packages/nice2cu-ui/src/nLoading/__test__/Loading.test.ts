import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp } from 'vue';

document.body.innerHTML = '<script></script>';

import nLoading from '../index';
import nLoadingVue from '../Loading.vue';

test('test Loading plugin', () => {
	const app = createApp({}).use(nLoading);
	expect(app.component((nLoading as { name: string }).name)).toBeTruthy();
});

describe('test Loading props', () => {
	test('test Loading type', () => {
		const typeArr: string[] = ['circle', 'time', 'wave', 'point', 'rever', 'bounce', 'battery'];
		typeArr.forEach((item) => {
			const wrapper = mount(nLoadingVue, {
				props: {
					type: item,
				},
			});
			expect(wrapper.find(`.n-loading-${item}`).exists()).toBe(true);
			wrapper.unmount();
		});
	});

	test('test Loading color', () => {
		const wrapper = mount(nLoadingVue, {
			props: {
				color: 'red',
			},
		});
		expect(wrapper.find('.n-loading-container').attributes('style')).toContain('color: red');
		wrapper.unmount();
	});

	test('test Loading loading', async () => {
		const wrapper = mount(nLoadingVue, {
			props: {
				loading: true,
			},
			slots: {
				default: () => 'default slots',
			},
		});
		expect(wrapper.find('.n-loading-container').exists()).toBe(true);
		await wrapper.setProps({ loading: false });
		expect(wrapper.find('.n-loading-container').exists()).toBe(false);
		wrapper.unmount();
	});

	test('test Loading size', () => {
		const sizeArr: string[] = ['mini', 'normal', 'small', 'large'];
		sizeArr.forEach((item) => {
			const wrapper = mount(nLoadingVue, {
				props: {
					size: item,
				},
			});
			expect(wrapper.find(`.n-loading--${item}`).exists()).toBe(true);
			wrapper.unmount();
		});
	});

	test('test Loading text', () => {
		const wrapper = mount(nLoadingVue, {
			props: {
				text: '加载中...',
			},
		});
		expect(wrapper.find('.n-loading-text').html()).toContain('加载中...');
		wrapper.unmount();
	});

	test('test Loading parallel', () => {
		const wrapper = mount(nLoadingVue, {
			props: {
				parallel: true,
			},
		});
		expect(wrapper.find('.n-loading-container--parallel').exists()).toBe(true);
		wrapper.unmount();
	});

	test('test Loading loadingAbsolute', () => {
		const wrapper = mount(nLoadingVue, {
			props: {
				loadingAbsolute: true,
			},
			slots: {
				default: () => 'default slots',
			},
		});
		expect(wrapper.find('.n-loading-container--absolute').exists()).toBe(true);
		wrapper.unmount();
	});

	test('test Loading showMask', () => {
		const wrapper = mount(nLoadingVue, {
			props: {
				showMask: true,
			},
			slots: {
				default: () => 'default slots',
			},
		});
		expect(wrapper.find('.n-loading-mask').exists()).toBe(true);
		wrapper.unmount();
	});
});
