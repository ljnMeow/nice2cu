import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp } from 'vue';

import nBadge from '../index';
import nBadgeVue from '../Badge.vue';

test('test Badge plugin', () => {
	const app = createApp({}).use(nBadge);
	expect(app.component((nBadge as { name: string }).name)).toBeTruthy();
});

describe('test Badge Props', () => {
	test('test Badge content', () => {
		const wrapper = mount(nBadgeVue, {
			props: {
				content: 10,
			},
		});
		expect(wrapper.find('.n-badge-content').html()).toContain(10);
		wrapper.unmount();
	});
});
