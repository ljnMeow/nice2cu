import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { createApp, h } from 'vue';

import nSpace from '../index';
import nSpaceVue from '../Space';

test('test Space plugin', () => {
	const app = createApp({}).use(nSpace);
	expect(app.component((nSpace as { name: string }).name)).toBeTruthy();
});

describe('test Space props', () => {
	test('test Space direction', () => {
		const directionArr: string[] = ['row', 'column'];
		directionArr.forEach((direction: string) => {
			const wrapper = mount(nSpaceVue as any, {
				props: {
					direction,
				},
			});
			expect(wrapper.find('.n-space').attributes('style')).toContain(`flex-direction: ${direction}`);
			wrapper.unmount();
		});
	});
	test('test Space justify', () => {
		const justifyArr: string[] = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
		justifyArr.forEach((justify: string) => {
			const wrapper = mount(nSpaceVue as any, {
				props: {
					justify,
				},
			});
			expect(wrapper.find('.n-space').attributes('style')).toContain(`justify-content: ${justify}`);
			wrapper.unmount();
		});
	});
	test('test Space justify', () => {
		const alignArr: string[] = ['flex-start', 'center', 'flex-end', 'baseline'];
		alignArr.forEach((align: string) => {
			const wrapper = mount(nSpaceVue as any, {
				props: {
					align,
				},
			});
			expect(wrapper.find('.n-space').attributes('style')).toContain(`align-items: ${align}`);
			wrapper.unmount();
		});
	});
	test('test Space wrap', async () => {
		const wrapper = mount(nSpaceVue, {
			props: {
				wrap: false,
			},
		});
		expect(wrapper.find('.n-space').attributes('style')).toContain(`flex-wrap: nowrap`);

		await wrapper.setProps({ wrap: true });
		expect(wrapper.find('.n-space').attributes('style')).toContain(`flex-wrap: wrap`);
		wrapper.unmount();
	});
	test('test Space block', async () => {
		const wrapper = mount(nSpaceVue, {
			props: {
				block: true,
			},
		});
		expect(wrapper.find('.n-space--block').exists()).toBe(true);

		await wrapper.setProps({ block: false });
		expect(wrapper.find('.n-space--block').exists()).toBe(false);
		wrapper.unmount();
	});
	test('test space default slots', () => {
		const wrapper = mount(nSpaceVue, {
			slots: {
				default: 'This is default slots',
			},
		});
		expect(wrapper.find('.n-space__margin-box').html()).toContain('This is default slots');
		wrapper.unmount();
	});
	test('test Space size', async () => {
		const wrapper = mount(nSpaceVue, {
			props: {
				size: [30, 30],
			},
			slots: {
				default: () => [1, 2, 3, 4].map((span) => h('div', [span])),
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
