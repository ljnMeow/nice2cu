import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { createApp } from 'vue';

import nButton from '../index';
import nButtonVue from '../Button.vue';

test('test Button plugin', () => {
	const app = createApp({}).use(nButton);
	expect(app.component((nButton as { name: string }).name)).toBeTruthy();
});

describe('test Button component event', () => {
	test('test button onClick & onTouchstart null callback', () => {
		const onClick = vi.fn();
		const onTouchStart = vi.fn();
		const wrapper = shallowMount(nButtonVue);
		wrapper.trigger('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		wrapper.trigger('touchstart');
		expect(onTouchStart).toHaveBeenCalledTimes(1);
		wrapper.unmount();
	});
});
