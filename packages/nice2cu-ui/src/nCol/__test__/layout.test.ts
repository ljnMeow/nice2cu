import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp, h } from 'vue';

import nRow from '../../nRow';
import nRowVue from '../../nRow/Row.vue';

import nCol from '../index';
import nColVue from '../Col.vue';

describe('test Layout plugin', () => {
	test('test Row plugin', () => {
		const app = createApp({}).use(nRow);
		expect(app.component((nRow as { name: string }).name)).toBeTruthy();
	});
	test('test Col plugin', () => {
		const app = createApp({}).use(nCol);
		expect(app.component((nCol as { name: string }).name)).toBeTruthy();
	});
});

describe('test Row props', () => {
	test('test Row gutter', async () => {
		const wrapper = mount(nRowVue, {
			props: {
				gutter: 20,
			},
			slots: {
				default: [8, 8, 8].map((span) => h(nColVue, { span })),
			},
		});
		const colElm20 = wrapper.findComponent(nColVue).element as HTMLElement;
		expect(colElm20.style.paddingLeft === '10px').toBe(true);
		expect(colElm20.style.paddingRight === '10px').toBe(true);
		await wrapper.setProps({ gutter: 40 });
		const colElm40 = wrapper.findComponent(nColVue).element as HTMLElement;
		expect(colElm40.style.paddingLeft === '20px').toBe(true);
		expect(colElm40.style.paddingRight === '20px').toBe(true);
		wrapper.unmount();
	});
	test('test Row justify', () => {
		const justifyList: string[] = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
		justifyList.forEach((justify) => {
			const wrapper = mount(nRowVue, {
				props: {
					justify,
				},
				slots: {
					default: () => [8, 8, 8].map((span) => h(nColVue, { span })),
				},
			});
			expect(wrapper.attributes('style')).toMatch(`justify-content: ${justify}`);
			wrapper.unmount();
		});
	});
	test('test Row align', () => {
		const alignList: string[] = ['flex-start', 'center', 'flex-end'];
		alignList.forEach((align) => {
			const wrapper = mount(nRowVue, {
				props: {
					align,
				},
				slots: {
					default: () => [8, 8, 8].map((span) => h(nColVue, { span })),
				},
			});
			expect(wrapper.attributes('style')).toMatch(`align-items: ${align}`);
			wrapper.unmount();
		});
	});
});
