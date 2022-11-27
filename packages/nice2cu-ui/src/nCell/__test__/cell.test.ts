import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp } from 'vue';

document.body.innerHTML = '<script></script>';

import nCell from '../index';
import nCellVue from '../Cell.vue';

test('test Cell plugin', () => {
	const app = createApp({}).use(nCell);
	expect(app.component((nCell as { name: string }).name)).toBeTruthy();
});

describe('test Loading props', () => {
	test('test cell title', () => {
		const wrapper = mount(nCellVue, {
			props: {
				title: '这是一个单元格',
			},
		});
		expect(wrapper.find('.n-cell__title').text()).toBe('这是一个单元格');
		wrapper.unmount();
	});

	test('test cell description', () => {
		const wrapper = mount(nCellVue, {
			props: {
				description: '这是描述信息',
			},
		});
		expect(wrapper.find('.n-cell__description').text()).toBe('这是描述信息');
		wrapper.unmount();
	});

	test('test Cell icon', () => {
		const wrapper = mount(nCellVue, {
			props: {
				icon: 'n-alarm-sharp',
			},
		});
		expect(wrapper.find('.n-cell--icon').classes()).toContain('n-alarm-sharp');
		wrapper.unmount();
	});

	test('test Cell iconPrefix', () => {
		const wrapper = mount(nCellVue, {
			props: {
				icon: 'n-alarm-sharp',
				iconPrefix: 'icon-class',
			},
		});
		expect(wrapper.find('.n-cell--icon').classes()).toContain('icon-class');
		wrapper.unmount();
	});

	test('test Cell extra', () => {
		const wrapper = mount(nCellVue, {
			props: {
				extra: 'n-alarm-sharp',
			},
		});
		expect(wrapper.find('.n-cell--extra').classes()).toContain('n-alarm-sharp');
		wrapper.unmount();
	});

	test('test Cell iconSize', () => {
		const wrapper = mount(nCellVue, {
			props: {
				icon: 'n-alarm-sharp',
				iconSize: 20,
			},
		});
		expect(wrapper.find('.n-cell--icon').attributes('style')).toContain('font-size: 20px');
		wrapper.unmount();
	});

	test('test Cell showArrow', () => {
		const arrowDirectionArr: string[] = ['up', 'right', 'down'];
		arrowDirectionArr.forEach((item) => {
			const wrapper = mount(nCellVue, {
				props: {
					showArrow: item,
				},
			});
			expect(wrapper.find('.n-cell--extra').classes()).toContain(`n-${item}`);
			wrapper.unmount();
		});
	});

	test('test Cell border', () => {
		const wrapper = mount(nCellVue, {
			props: {
				border: true,
			},
		});
		expect(wrapper.find('.n-cell--border').exists()).toBe(true);
		wrapper.unmount();
	});
});
