import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { createApp, Fragment, h } from 'vue';

import nAvatar from '../';
import nAvatarVue from '../Avatar.vue';
import nAvatarGroup from '../../nAvatarGroup';
import nAvatarGroupVue from '../../nAvatarGroup/AvatarGroup';

test('test Avatar && AvatarGroup plugin', () => {
	const app = createApp({}).use(nAvatar).use(nAvatarGroup);
	expect(app.component((nAvatar as { name: string }).name)).toBeTruthy();
	expect(app.component((nAvatarGroup as { name: string }).name)).toBeTruthy();
});

describe('test Avatar props', () => {
	test('test Avatar round', async () => {
		const wrapper = mount(nAvatarVue, {
			props: {
				round: true,
			},
		});
		expect(wrapper.find('.n-avatar--round').exists()).toBe(true);
		await wrapper.setProps({ round: false });
		expect(wrapper.find('.n-avatar--round').exists()).toBe(false);
		wrapper.unmount();
	});
	test('test Avatar size', () => {
		expect(mount(nAvatarVue, { props: { size: 'mini' } }).html()).toMatchSnapshot();
		expect(mount(nAvatarVue, { props: { size: 'small' } }).html()).toMatchSnapshot();
		expect(mount(nAvatarVue, { props: { size: 'normal' } }).html()).toMatchSnapshot();
		expect(mount(nAvatarVue, { props: { size: 'large' } }).html()).toMatchSnapshot();
		expect(mount(nAvatarVue, { props: { size: '80' } }).html()).toMatchSnapshot();
		expect(mount(nAvatarVue, { props: { size: 100 } }).html()).toMatchSnapshot();
	});
	test('test Avatar color', () => {
		expect(mount(nAvatarVue, { props: { color: 'red' } }).html()).toMatchSnapshot();
	});
	test('test Avatar bordered && borderColor', () => {
		expect(mount(nAvatarVue, { props: { bordered: true, borderColor: 'red' } }).html()).toMatchSnapshot();
	});

	test('test Avatar src', () => {
		expect(mount(nAvatarVue, { props: { src: 'https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg' } }).html()).toMatchSnapshot();
	});

	test('test Avatar alt', () => {
		expect(mount(nAvatarVue, { props: { src: 'https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg', alt: 'avatar' } }).html()).toMatchSnapshot();
	});

	test('test Avatar src and fit', () => {
		expect(mount(nAvatarVue, { props: { src: 'https://bu.dusays.com/2023/08/15/64dadbff3d163.jpg', fit: 'fill' } }).html()).toMatchSnapshot();
	});
	test('test Avatar onClick', async () => {
		const onClick = vi.fn();
		const wrapper = mount(nAvatarVue, { props: { onClick } });
		await wrapper.trigger('click');
		expect(onClick).toBeCalledTimes(1);
	});
});

describe('test AvatarGroup props', () => {
	test('test AvatarGroup vertical', () => {
		const wrapper = mount(nAvatarGroupVue, {
			props: {
				vertical: true,
			},
			slots: {
				default: () => h(Fragment, [h(nAvatar), h(nAvatar), h(nAvatar)]),
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
	test('test AvatarGroup offset', () => {
		const wrapper = mount(nAvatarGroupVue, {
			props: {
				offset: 10,
			},
			slots: {
				default: () => h(Fragment, [h(nAvatar), h(nAvatar), h(nAvatar)]),
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
	test('test AvatarGroup maxLength', () => {
		const wrapper = mount(nAvatarGroupVue, {
			props: {
				maxLength: 2,
			},
			slots: {
				default: () => h(Fragment, [h(nAvatar), h(nAvatar), h(nAvatar)]),
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
