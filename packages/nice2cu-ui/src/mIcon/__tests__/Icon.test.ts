import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { createApp } from 'vue';

document.body.innerHTML = '<script></script>';

import mIcon from '../index';

test('test icon plugin', () => {
	const app = createApp({}).use(mIcon);
	expect(app.component(mIcon.name)).toBeTruthy();
});

test('test icon onClick', () => {
	const onClick = vi.fn();
	const wrapper = shallowMount(mIcon, {
		props: {
			icon: 'n-alarm-sharp',
			onClick,
		},
	});
	wrapper.trigger('click');
	expect(onClick).toHaveBeenCalledTimes(1);
	wrapper.unmount();
});

describe('test Icon Props', () => {
	test('test Icon icon', () => {
		const wrapper = shallowMount(mIcon, {
			props: {
				icon: 'n-alarm-sharp',
			},
		});
		expect(wrapper.find('.n-icon').classes()).toContain('n-alarm-sharp');
		wrapper.unmount();
	});

	test('test Icon Size', async () => {
		const wrapper = shallowMount(mIcon, {
			props: {
				icon: 'n-alarm-sharp',
				size: 16,
			},
		});
		expect(wrapper.find('.n-icon').attributes('style')).toContain('font-size: 16px;');
		await wrapper.setProps({ icon: 'n-alarm-sharp', size: '20px' });
		expect(wrapper.find('.n-icon').attributes('style')).toContain('font-size: 20px;');
		await wrapper.setProps({ icon: 'n-alarm-sharp', size: '16rem' });
		expect(wrapper.find('.n-icon').attributes('style')).toContain('font-size: 16rem;');
		await wrapper.setProps({ icon: 'n-alarm-sharp', size: '16em' });
		expect(wrapper.find('.n-icon').attributes('style')).toContain('font-size: 16em;');
		await wrapper.setProps({ icon: 'n-alarm-sharp', size: '16vw' });
		expect(wrapper.find('.n-icon').attributes('style')).toContain('font-size: 16vw;');
		wrapper.unmount();
	});

	test('test Icon Color', () => {
		const wrapper = shallowMount(mIcon, {
			props: {
				icon: 'n-alarm-sharp',
				color: '#e2e2e2',
			},
		});
		expect(wrapper.find('.n-icon').attributes('style')).toContain('color: #e2e2e2;');
		wrapper.unmount();
	});

	test('test Icon Margin', () => {
		const wrapper = shallowMount(mIcon, {
			props: {
				icon: 'n-alarm-sharp',
				margin: 10,
			},
		});
		expect(wrapper.find('.n-icon').attributes('style')).toContain('margin: 10px;');
		wrapper.unmount();
	});

	test('test Icon badge', () => {
		const wrapper = shallowMount(mIcon, {
			props: {
				icon: 'n-alarm-sharp',
				badge: true,
			},
		});
		expect(wrapper.find('.n-icon--badge').html()).toMatchSnapshot();
		wrapper.unmount();
	});

	test('test Icon badge String', () => {
		const wrapper = shallowMount(mIcon, {
			props: {
				icon: 'n-alarm-sharp',
				badge: '10',
			},
		});
		expect(wrapper.find('.n-icon--badge').html()).toMatchSnapshot();
		wrapper.unmount();
	});

	test('test Icon badge Number', () => {
		const wrapper = shallowMount(mIcon, {
			props: {
				icon: 'n-alarm-sharp',
				badge: 10,
			},
		});
		expect(wrapper.find('.n-icon--badge').html()).toMatchSnapshot();
		wrapper.unmount();
	});

	test('test Icon multicolor', () => {
		const wrapper = shallowMount(mIcon, {
			props: {
				icon: 'n-alarm-sharp',
				multicolor: true,
			},
		});
		expect(wrapper.find('.n-icon').html()).toMatchSnapshot();
		wrapper.unmount();
	});

	test('test Icon ClassPrefix', () => {
		const wrapper = shallowMount(mIcon, {
			props: {
				icon: 'n-alarm-sharp',
				classPrefix: 'xxx-icon',
			},
		});
		expect(wrapper.find('.n-icon').classes()).toContain('xxx-icon');
		wrapper.unmount();
	});
});
