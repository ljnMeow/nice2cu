import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp, nextTick } from 'vue';

import nDivider from '../';
import nDividerVue from '../Divider';

test('test Divider plugin', () => {
	const app = createApp({}).use(nDivider);
	expect(app.component((nDivider as { name: string }).name)).toBeTruthy();
});

describe('test Divider props', () => {
	test('test Divider vertical', () => {
		const wrapper = mount(nDividerVue, {
			props: {
				vertical: true,
			},
		});
		expect(wrapper.find('.n-divider--vertical').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test Divider dashed', () => {
		const wrapper = mount(nDividerVue, {
			props: {
				dashed: true,
			},
		});
		expect(wrapper.find('.n-divider--dashed').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test Divider hairline', () => {
		const wrapper = mount(nDividerVue, {
			props: {
				hairline: true,
			},
		});
		expect(wrapper.find('.n-divider--hairline').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test Divider customStyle', () => {
		const wrapper = mount(nDividerVue, {
			props: {
				customStyle: { color: 'red', borderColor: 'red' },
			},
		});
		expect(wrapper.find('.n-divider').attributes().style).toContain('color: red; border-color: red');
		wrapper.unmount();
	});
	test('test Divider contentPosition', () => {
		const contentPositionArr = ['left', 'center', 'right'];
		contentPositionArr.forEach((item) => {
			const wrapper = mount(nDividerVue as any, {
				props: {
					contentPosition: item,
				},
			});
			if (item === 'left') {
				expect(wrapper.find('.n-divider__left--text').exists()).toBe(true);
			} else if (item === 'right') {
				expect(wrapper.find('.n-divider__right--text').exists()).toBe(true);
			} else if (item === 'center') {
				expect(wrapper.find('.n-divider').exists()).toBe(true);
			}
			wrapper.unmount();
		});
	});
});
