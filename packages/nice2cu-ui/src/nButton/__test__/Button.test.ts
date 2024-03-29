import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { createApp } from 'vue';
import { delay } from '../../../utils/tools';

document.body.innerHTML = '<script></script>';

import nButton from '../index';
import nButtonVue from '../Button.vue';

test('test Button plugin', () => {
	const app = createApp({}).use(nButton);
	expect(app.component((nButton as { name: string }).name)).toBeTruthy();
});

describe('test Button event', () => {
	test('test button onClick null callback', () => {
		const wrapper = mount(nButtonVue);
		wrapper.trigger('click');
		wrapper.unmount();
	});

	test('test Button onclick', () => {
		const onClick = vi.fn();
		const wrapper = mount(nButtonVue, {
			props: {
				onClick,
			},
		});
		wrapper.trigger('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		wrapper.unmount();
	});
});

describe('test Button props', () => {
	test('test Button type', () => {
		const typeArr: string[] = ['default', 'primary', 'info', 'success', 'warning', 'danger'];
		typeArr.forEach((item) => {
			const wrapper = mount(nButtonVue, {
				props: {
					type: item,
				},
			});
			expect(wrapper.find('.n-button').classes()).toContain(`n-button--${item}`);
			wrapper.unmount();
		});
	});

	test('test Button size', () => {
		const sizeArr: string[] = ['normal', 'mini', 'small', 'large'];
		sizeArr.forEach((item) => {
			const wrapper = mount(nButtonVue, {
				props: {
					size: item,
				},
			});
			expect(wrapper.find('.n-button').classes()).toContain(`n-button--${item}`);
			wrapper.unmount();
		});
	});

	test('test Button border', async () => {
		const wrapper = mount(nButtonVue, {
			props: {
				border: true,
			},
		});
		expect(wrapper.find('.n-button').classes()).toContain('n-button--border-default');
		await wrapper.setProps({ border: false });
		expect(wrapper.find('.n-button').classes()).not.toContain('n-button--border-default');
		wrapper.unmount();
	});

	test('test Button shape', () => {
		const shapeArr: string[] = ['round', 'square', 'radius'];
		shapeArr.forEach((item) => {
			const wrapper = mount(nButtonVue, {
				props: {
					shape: item,
				},
			});
			expect(wrapper.find('.n-button').classes()).toContain(`n-button--${item}`);
			wrapper.unmount();
		});
	});

	test('test Button disabled', async () => {
		const onClick = vi.fn();
		const wrapper = mount(nButtonVue, {
			props: {
				onClick,
				disabled: true,
			},
		});
		await wrapper.trigger('click');
		expect(wrapper.classes()).toContain('n-button--disabled');
		expect(onClick).toHaveBeenCalledTimes(0);
		wrapper.unmount();
	});

	test('test Button block', async () => {
		const wrapper = mount(nButtonVue, {
			props: {
				block: true,
			},
		});
		expect(wrapper.find('.n-button').classes()).toContain('n-button--block');
		await wrapper.setProps({ block: false });
		expect(wrapper.find('.n-button').classes()).not.toContain('n-button--block');
		wrapper.unmount();
	});

	test('test Button isRipple', async () => {
		const wrapper = mount(nButtonVue, {
			props: {
				isRipple: true,
			},
		});

		wrapper.trigger('mousedown');
		const startTime = performance.now();
		expect(wrapper.find('.n-ripple').exists()).toBe(true);
		wrapper.trigger('mouseup');
		const endTime = 300 - performance.now() + startTime + 310;
		await delay(endTime);
		expect(wrapper.find('.n-ripple').exists()).toBe(false);

		await wrapper.setProps({ isRipple: false });
		wrapper.trigger('mousedown');
		expect(wrapper.find('.n-ripple').exists()).toBe(false);

		wrapper.unmount();
	});

	test('test Button bgColor', () => {
		const wrapper = mount(nButtonVue, {
			props: {
				bgColor: '#e2e2e2',
			},
		});
		expect(wrapper.attributes('style')).toMatch('background: #e2e2e2');
		wrapper.unmount();
	});

	test('test Button textColor', () => {
		const wrapper = mount(nButtonVue, {
			props: {
				textColor: '#2e317c',
			},
		});
		expect(wrapper.attributes('style')).toMatch('color: #2e317c');
		wrapper.unmount();
	});

	test('test Button loading', async () => {
		const onClick = vi.fn();
		const wrapper = mount(nButtonVue, {
			props: {
				loading: true,
			},
		});
		await wrapper.trigger('click');
		expect(wrapper.find('.n-button__loading').exists()).toBe(true);
		expect(onClick).toHaveBeenCalledTimes(0);
		wrapper.unmount();
	});

	test('test Button loadingText', () => {
		const wrapper = mount(nButtonVue, {
			props: {
				loading: true,
				loadingText: '加载中...',
			},
		});
		expect(wrapper.find('.n-loading-text').html()).toContain('加载中...');
		wrapper.unmount();
	});

	test('test Button loadingType', () => {
		const loadingTypeArr: string[] = ['circle', 'time', 'wave', 'point', 'rever', 'bounce', 'battery'];
		loadingTypeArr.forEach((item) => {
			const wrapper = mount(nButtonVue, {
				props: {
					loading: true,
					loadingType: item,
				},
			});
			expect(wrapper.find(`.n-loading-${item}`).exists()).toBe(true);
			wrapper.unmount();
		});
	});

	test('test Button loadingSize', () => {
		const loadingSizeArr: string[] = ['normal', 'mini', 'small', 'large'];
		loadingSizeArr.forEach((item) => {
			const wrapper = mount(nButtonVue, {
				props: {
					loading: true,
					loadingSize: item,
				},
			});
			expect(wrapper.find(`.n-loading--${item}`).exists()).toBe(true);
			wrapper.unmount();
		});
	});
});
