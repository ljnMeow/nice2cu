import { expect, describe, test, vi } from 'vitest';
import { createApp } from 'vue';
import { mount } from '@vue/test-utils';

document.body.innerHTML = '<script></script>';

import nTag from '../';
import nTagVue from '../Tag.vue';

test('test Tag plugin', () => {
	const app = createApp({}).use(nTag);
	expect(app.component((nTag as { name: string }).name)).toBeTruthy();
});

describe('test Tag props', () => {
	test('test Tag type', () => {
		const tagtype = ['primary', 'success', 'danger', 'warning', 'default'];
		tagtype.forEach((type) => {
			const wrapper = mount(nTagVue as any, {
				props: {
					type,
				},
			});
			expect(wrapper.find('.n-tag').classes()).toContain(`n-tag--${type}`);
			wrapper.unmount();
		});
	});
	test('test Tag size', () => {
		const tagSize = ['normal', 'mini', 'small', 'large'];
		tagSize.forEach((size) => {
			const wrapper = mount(nTagVue as any, {
				props: {
					size,
				},
			});
			expect(wrapper.find('.n-tag').classes()).toContain(`n-tag--${size}`);
			wrapper.unmount();
		});
	});
	test('test Tag color', () => {
		const wrapper = mount(nTagVue, {
			props: {
				color: 'red',
			},
		});
		expect(wrapper.attributes('style')).toContain('background: red');
		wrapper.unmount();
	});
	test('test Tag textColor', () => {
		const wrapper = mount(nTagVue, {
			props: {
				textColor: 'red',
			},
		});
		expect(wrapper.find('.n-tag-text').attributes('style')).toContain('color: red');
		wrapper.unmount();
	});
	test('test Tag plain', async () => {
		const wrapper = mount(nTagVue, {
			props: {
				plain: true,
			},
		});
		expect(wrapper.find('.n-tag__plain').exists()).toBe(true);

		await wrapper.setProps({ plain: false });
		expect(wrapper.find('.n-tag__plain').exists()).toBe(false);
		wrapper.unmount();
	});
	test('test Tag round', async () => {
		const wrapper = mount(nTagVue, {
			props: {
				round: true,
			},
		});
		expect(wrapper.find('.n-tag--round').exists()).toBe(true);

		await wrapper.setProps({ round: false });
		expect(wrapper.find('.n-tag--round').exists()).toBe(false);
		wrapper.unmount();
	});
	test('test Tag closeable && closeName', async () => {
		const wrapper = mount(nTagVue, {
			props: {
				closeable: true,
				closeName: 'close-name',
			},
		});
		expect(wrapper.find('.n-tag-close').exists()).toBe(true);
		expect(wrapper.find('.close-name').exists()).toBe(true);

		await wrapper.setProps({ closeable: false });
		expect(wrapper.find('.n-tag-close').exists()).toBe(false);
		wrapper.unmount();
	});
});

test('test Tag onClose', () => {
	const onClose = vi.fn();
	const wrapper = mount(nTagVue, {
		props: {
			onClose,
			closeable: true,
		},
	});
	const closeEl = wrapper.find('.n-tag-close');
	closeEl.trigger('click');
	expect(onClose).toHaveBeenCalledTimes(1);
	wrapper.unmount();
});
