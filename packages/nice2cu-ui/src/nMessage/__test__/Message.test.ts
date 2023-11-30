import { expect, describe, test } from 'vitest';
import { createApp, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { delay } from '../../../utils/tools';

document.body.innerHTML = '<script></script>';

import nMessage from '../';
import nMessageVue from '../Message.vue';

test('test Message plugin', () => {
	const app = createApp({}).use(nMessage);
	expect(app.component((nMessageVue as { name: string }).name)).toBeTruthy();
});

describe('test Message props', () => {
	test('test Message id && content', async () => {
		const wrapper = mount(nMessageVue, {
			props: {
				id: 'message-test',
				content: 'Nice2CU-UI',
			},
		});
		await nextTick();
		expect(wrapper.find('.n-message').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test Message hasMask && maskColor && clickMaskClose', async () => {
		const wrapper = mount(nMessageVue, {
			props: {
				id: 'message-test',
				content: 'Nice2CU-UI',
				hasMask: true,
				maskColor: 'rgba(0, 0, 0, 0.5)',
				clickMaskClose: true,
				duration: 0,
			},
		});
		await nextTick();
		expect(wrapper.find('.n-message__mask').exists()).toBe(true);
		expect(wrapper.find('.n-message__mask').attributes('style')).toContain('background-color: rgba(0, 0, 0, 0.5)');

		await wrapper.find('.n-message__mask').trigger('click');
		expect(wrapper.find('.n-message').exists()).toBe(false);

		wrapper.unmount();
	});
	test('test Message duration', async () => {
		const wrapper = mount(nMessageVue, {
			props: {
				id: 'message-test',
				content: 'Nice2CU-UI',
				duration: 3000,
			},
		});
		await nextTick();
		expect(wrapper.find('.n-message').exists()).toBe(true);
		await delay(3000);
		expect(wrapper.find('.n-message').exists()).toBe(false);
		wrapper.unmount();
	});
	test('test Message icon && iconSize && iconPrefix', async () => {
		const wrapper = mount(nMessageVue, {
			props: {
				id: 'message-test',
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
	test('test Message offset && zIndex', async () => {
		const wrapper = mount(nMessageVue, {
			props: {
				id: 'message-test',
				content: 'Nice2CU-UI',
				offset: '50',
				zIndex: 200,
			},
		});
		await nextTick();
		expect(wrapper.find('.n-message-outer').attributes('style')).toContain('top: 50px; z-index: 200;');
		wrapper.unmount();
	});
});
