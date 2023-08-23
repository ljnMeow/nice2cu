import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp, nextTick } from 'vue';

import nEllipsis from '../';
import nEllipsisVue from '../Ellipsis.vue';

const content =
	'先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也';

test('test Ellipsis plugin', () => {
	const app = createApp({}).use(nEllipsis);
	expect(app.component((nEllipsis as { name: string }).name)).toBeTruthy();
});

describe('test Ellipsis props', () => {
	test('test Ellipsis rows', async () => {
		const wrapper = mount(nEllipsisVue, {
			props: {
				content: content,
				rows: 3,
			},
		});
		await nextTick();
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
	test('test Ellipsis direction start', async () => {
		const wrapper = mount(nEllipsisVue, {
			props: {
				content: content,
				rows: 3,
				direction: 'start',
			},
		});
		await nextTick();
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
	test('test Ellipsis direction center', async () => {
		const wrapper = mount(nEllipsisVue, {
			props: {
				content: content,
				rows: 3,
				direction: 'center',
			},
		});
		await nextTick();
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
	test('test Ellipsis showExpand', async () => {
		const wrapper = mount(nEllipsisVue, {
			props: {
				content: content,
				rows: 3,
				showExpand: true,
			},
		});
		await nextTick();
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
	test('test Ellipsis expandText && collapseText', async () => {
		const wrapper = mount(nEllipsisVue, {
			props: {
				content: content,
				rows: 3,
				showExpand: true,
				expandText: '打开',
				collapseText: '关闭',
			},
		});
		await nextTick();
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
