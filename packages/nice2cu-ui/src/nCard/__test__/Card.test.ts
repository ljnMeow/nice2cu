import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp } from 'vue';

import nCard from '../index';
import nCardVue from '../Card.vue';

test('test Card plugin', () => {
	const app = createApp({}).use(nCard);
	expect(app.component((nCard as { name: string }).name)).toBeTruthy();
});

describe('test Card props', () => {
	test('test Card outline', async () => {
		const wrapper = mount(nCardVue, {
			props: {
				outline: true,
			},
		});
		expect(wrapper.find('.n-card').classes()).toContain('n-card--outline');
		await wrapper.setProps({ outline: false });
		expect(wrapper.find('.n-card').classes()).not.toContain('n-card--outline');
		wrapper.unmount();
	});
	test('test Card title、subtitle and description', async () => {
		const wrapper = mount(nCardVue, {
			props: {
				title: 'nice2cu-UI Card组件',
				subtitle: '基于Vue3.0 + vite构建的移动端组件库',
				description:
					'基于Vue3.0 + vite构建的移动端组件库，最初的目的是为了方面自己开发，设计方面参考各大网红组件库的设计，现已开源，供大家使用，后面也会不断完善组件库并加入自己的设计，不足之处请各位大佬多多指教',
			},
		});
		expect(wrapper.find('.n-card__title').html()).toContain('nice2cu-UI Card组件');
		expect(wrapper.find('.n-card__subtitle').html()).toContain('基于Vue3.0 + vite构建的移动端组件库');
		expect(wrapper.find('.n-card__description').html()).toContain(
			'基于Vue3.0 + vite构建的移动端组件库，最初的目的是为了方面自己开发，设计方面参考各大网红组件库的设计，现已开源，供大家使用，后面也会不断完善组件库并加入自己的设计，不足之处请各位大佬多多指教'
		);
		wrapper.unmount();
	});
	test('test Card isTitleEllipsis and isSubtitleEllipsis', async () => {
		const wrapper = mount(nCardVue, {
			props: {
				title: 'nice2cu-UI Card组件',
				subtitle: '基于Vue3.0 + vite构建的移动端组件库',
				isTitleEllipsis: true,
				isSubtitleEllipsis: true,
			},
		});
		expect(wrapper.find('.n-card__title').classes()).toContain('text-ellipsis');
		expect(wrapper.find('.n-card__subtitle').classes()).toContain('text-ellipsis');
		wrapper.unmount();
	});
});
