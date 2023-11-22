import { expect, describe, test } from 'vitest';
import { createApp, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { delay } from '../../../utils/tools';

document.body.innerHTML = '<script></script>';

import nToast from '../';
import nToastVue from '../Toast.vue';

test('test Toast plugin', () => {
	const app = createApp({}).use(nToast);
	expect(app.component((nToastVue as { name: string }).name)).toBeTruthy();
});

describe('test Toast props', () => {
	test('test Toast id && content', async () => {
		const wrapper = mount(nToastVue, {
			props: {
				id: 'toast-test',
				content: 'Nice2CU-UI',
			},
		});
		await nextTick();
		expect(wrapper.find('.n-toast').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test Toast hasMask && maskColor && clickMaskClose', async () => {
		const wrapper = mount(nToastVue, {
			props: {
				id: 'toast-test',
				content: 'Nice2CU-UI',
				hasMask: true,
				maskColor: 'rgba(0, 0, 0, 0.5)',
				clickMaskClose: true,
				duration: 0,
			},
		});
		await nextTick();
		expect(wrapper.find('.n-toast__mask').exists()).toBe(true);
		expect(wrapper.find('.n-toast__mask').attributes('style')).toContain('background-color: rgba(0, 0, 0, 0.5)');

		await wrapper.find('.n-toast__mask').trigger('click');
		expect(wrapper.find('.n-toast').exists()).toBe(false);

		wrapper.unmount();
	});
	test('test Toast duration', async () => {
		const wrapper = mount(nToastVue, {
			props: {
				id: 'toast-test',
				content: 'Nice2CU-UI',
				duration: 3000,
			},
		});
		await nextTick();
		expect(wrapper.find('.n-toast').exists()).toBe(true);
		await delay(3000);
		expect(wrapper.find('.n-toast').exists()).toBe(false);
		wrapper.unmount();
	});
	test('test Toast icon && iconSize && iconPrefix', async () => {
		const wrapper = mount(nToastVue, {
			props: {
				id: 'toast-test',
				content: 'Nice2CU-UI',
				icon: 'success',
				iconSize: '40px',
				iconPrefix: 'nice-icon',
			},
		});
		await nextTick();
		expect(wrapper.find('.n-icon').classes()).toContain('success');
		expect(wrapper.find('.n-icon').classes()).toContain('nice-icon');
		expect(wrapper.find('.n-icon').attributes('style')).toContain('font-size: 40px');
		wrapper.unmount();
	});
});
