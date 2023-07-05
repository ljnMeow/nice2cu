import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp, h } from 'vue';

import nBadge from '../index';
import nBadgeVue from '../Badge.vue';

test('test Badge plugin', () => {
	const app = createApp({}).use(nBadge);
	expect(app.component((nBadge as { name: string }).name)).toBeTruthy();
});

describe('test Badge Props', () => {
	test('test Badge content', () => {
		const wrapper = mount(nBadgeVue, {
			props: {
				content: 10,
			},
		});
		expect(wrapper.find('.n-badge-content').html()).toContain(10);
		wrapper.unmount();
	});
	test('test Badge hidden', async () => {
		const wrapper = mount(nBadgeVue, {
			props: {
				content: 10,
				hidden: true,
			},
		});
		expect(wrapper.find('.n-badge-content').exists()).toBe(false);
		await wrapper.setProps({ hidden: false });
		expect(wrapper.find('.n-badge-content').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test Badge dot', async () => {
		const wrapper = mount(nBadgeVue, {
			props: {
				dot: true,
			},
		});
		expect(wrapper.find('.n-badge__dot').exists()).toBe(true);
		await wrapper.setProps({ dot: false });
		expect(wrapper.find('.n-badge__dot').exists()).toBe(false);
		wrapper.unmount();
	});
	test('test Badge maxValue', async () => {
		const wrapper = mount(nBadgeVue, {
			props: {
				content: 100,
				maxValue: 99,
			},
		});
		expect(wrapper.find('.n-badge-content').html()).toContain('99+');
		await wrapper.setProps({ maxValue: 101 });
		expect(wrapper.find('.n-badge-content').html()).toContain('100');
		wrapper.unmount();
	});
	test('test Badge color', () => {
		const wrapper = mount(nBadgeVue, {
			props: {
				content: 10,
				color: '#cccccc',
			},
		});
		expect(wrapper.find('.n-badge-content').attributes('style')).toContain('background: #cccccc');
		wrapper.unmount();
	});
	test('test Badge color', () => {
		const positionList = ['right-top', 'right-bottom', 'left-top', 'left-bottom'];
		positionList.forEach((position) => {
			const boxStyle = {
				width: '3rem',
				height: '3rem',
				backgroundColor: '#cccccc',
				borderRadius: ' 4px',
			};
			const wrapper = mount(nBadgeVue as any, {
				props: {
					content: 10,
					position,
				},
				slots: {
					default: () => h('div', { style: boxStyle }),
				},
			});
			expect(wrapper.find('.n-badge-content').classes()).toContain(`n-badge--${position}`);
			wrapper.unmount();
		});
	});
});
