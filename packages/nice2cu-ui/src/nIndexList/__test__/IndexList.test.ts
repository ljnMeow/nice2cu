import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp, nextTick } from 'vue';

import nIndexList from '../index';
import nIndexListVue from '../IndexList.vue';

const list = [
	{
		title: 'A',
		list: [
			{
				name: '安徽',
				id: 1,
			},
		],
	},
	{
		title: 'B',
		list: [
			{
				name: '北京',
				id: 2,
			},
		],
	},
	{
		title: 'G',
		list: [
			{
				name: '广西',
				id: 3,
			},
			{
				name: '广东',
				id: 4,
			},
		],
	},
	{
		title: 'H',
		list: [
			{
				name: '湖南',
				id: 5,
			},
			{
				name: '湖北',
				id: 6,
			},
		],
	},
];

test('test IndexList plugin', () => {
	const app = createApp({}).use(nIndexList);
	expect(app.component(nIndexList.name)).toBeTruthy();
});

describe('test IndexList props', () => {
	test('test IndexList indexList && height', async () => {
		const wrapper = mount(nIndexListVue, {
			props: {
				indexList: JSON.parse(JSON.stringify(list)),
				height: 200,
			},
		});
		await nextTick();
		expect(wrapper.findAll('.n-indexlist-item').length).toBe(list.length);
		expect((wrapper.find('.n-indexlist-inner').element as HTMLElement).style.height).toBe('200px');
		wrapper.unmount();
	});

	test('test IndexList hideBar', async () => {
		const wrapper = mount(nIndexListVue, {
			props: {
				indexList: JSON.parse(JSON.stringify(list)),
				hideBar: true,
			},
		});
		await nextTick();
		expect(wrapper.find('.n-indexlist-bar').exists()).toBe(false);
		await wrapper.setProps({ indexList: JSON.parse(JSON.stringify(list)), hideBar: false });
		expect(wrapper.find('.n-indexlist-bar').exists()).toBe(true);
		wrapper.unmount();
	});

	test('test IndexList highlightColor', async () => {
		const wrapper = mount(nIndexListVue, {
			props: {
				indexList: JSON.parse(JSON.stringify(list)),
				highlightColor: 'red',
			},
		});
		await nextTick();
		expect((wrapper.find('.n-indexlist__bar-item').element as HTMLElement).style.color).toBe('red');
		wrapper.unmount();
	});
});

describe('test IndexList Event', () => {
	test('test IndexList itemClick', async () => {
		const wrapper = mount(nIndexListVue, {
			props: {
				indexList: JSON.parse(JSON.stringify(list)),
			},
		});
		const listItem = wrapper.findAll('.n-indexlist-item')[1];
		await listItem.find('.n-indexlist__name').trigger('click');
		expect(listItem.find('.n-indexlist__name').classes()).toContain('n-indexlist__name--active');
		wrapper.unmount();
	});
});
