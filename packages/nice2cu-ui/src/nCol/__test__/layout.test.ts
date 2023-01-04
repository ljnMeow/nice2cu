import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { createApp } from 'vue';

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
	test('test Row gutter', () => {
		const wrapper = mount(nRowVue, {
			props: {
				gutter: 20,
			},
		});
	});
});
