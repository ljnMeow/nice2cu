import { expect, describe, test } from 'vitest';
import { createApp } from 'vue';
import { mount } from '@vue/test-utils';
import { delay } from '../../../utils/tools';

document.body.innerHTML = '<script></script>';

import nTabs from '../';
import nTabItem from '../../nTabItem';

const DefaultWrapper = {
	components: {
		[nTabs.name]: nTabs,
		[nTabItem.name]: nTabItem,
	},
	data: () => ({
		active: 0,
	}),
	template: `
        <n-tabs ref="tabs" v-model="active" style="width: 100px">
            <n-tab-item title="标签1">内容1</n-tab-item>
            <n-tab-item title="标签2">内容2</n-tab-item>
            <n-tab-item title="标签3">内容3</n-tab-item>
        </n-tabs>  
    `,
};

test('test Tabs && TabItem plugin', () => {
	const app = createApp({}).use(nTabs).use(nTabItem);
	expect(app.component((nTabs as { name: string }).name)).toBeTruthy();
	expect(app.component((nTabItem as { name: string }).name)).toBeTruthy();
});

describe('test Tabs && TabItem props', () => {
	test('test Tabs activeColor && defaultColor', () => {
		const wrapper = mount(DefaultWrapper, {
			props: {
				activeColor: 'red',
				defaultColor: 'blue',
			},
		});
		expect(wrapper.find('.n-tabs-nav-item--active').attributes().style).toContain('color: red');
		wrapper.findAll('.n-tabs-nav-item').forEach((child) => {
			if (!child.attributes().class.includes('n-tabs-nav-item--active')) {
				expect(child.attributes().style).toContain('color: blue');
			}
			wrapper.unmount();
		});
		wrapper.unmount();
	});
	test('test Tabs background', () => {
		const wrapper = mount(DefaultWrapper, {
			props: {
				background: 'red',
			},
		});
		expect(wrapper.find('.n-tabs-nav').attributes().style).toContain('background: red');
		wrapper.unmount();
	});
	test('test Tabs shadowBottom && shadowColor', () => {
		const wrapper = mount(DefaultWrapper, {
			props: {
				shadowBottom: true,
				shadowColor: 'red',
			},
		});
		expect(wrapper.find('.n-tabs-nav').attributes('style')).toContain('box-shadow: 0px 2px 4px 0px red');
		wrapper.unmount();
	});
	test('test Tabs scroll', async () => {
		const wrapper = mount(DefaultWrapper, {
			props: {
				scroll: true,
			},
		});
		expect(wrapper.find('.n-tabs-nav--scroll').exists()).toBe(true);

		await wrapper.setProps({ scroll: false });
		expect(wrapper.find('.n-tabs-nav--scroll').exists()).toBe(false);
		wrapper.unmount();
	});
	test('test Tabs lineAnimated && wrapperAnimated', async () => {
		const wrapper = mount(DefaultWrapper, {
			props: {
				lineAnimated: false,
				wrapperAnimated: false,
			},
		});
		expect(wrapper.find('.n-tabs-nav--animated').exists()).toBe(false);
		expect(wrapper.find('.n-tabs-nav__line--animated').exists()).toBe(false);
		expect(wrapper.find('.n-tabs-scroll__wrapper').attributes('style')).toContain('transition-duration: 0ms;');

		await wrapper.setProps({
			lineAnimated: true,
			wrapperAnimated: true,
		});
		expect(wrapper.find('.n-tabs-nav--animated').exists()).toBe(true);
		expect(wrapper.find('.n-tabs-nav__line--animated').exists()).toBe(true);
		expect(wrapper.find('.n-tabs-scroll__wrapper').attributes('style')).toContain('transition-duration: 300ms;');

		wrapper.unmount();
	});
	test('test Tabs wrapperHeight', () => {
		const wrapper = mount(DefaultWrapper, {
			props: {
				wrapperHeight: 300,
			},
		});
		wrapper.findAll('.n-tabs-wrapper__item').forEach((child) => {
			expect(child.attributes('style')).toContain('height: 300px');
			wrapper.unmount();
		});
	});
	test('test Tabs vertical && leftWidth', async () => {
		const wrapper = mount(DefaultWrapper, {
			props: {
				vertical: true,
				leftWidth: 50,
			},
		});
		await delay(300);
		expect(wrapper.find('.n-tabs--vertical').exists()).toBe(true);
		expect(wrapper.find('.n-tabs-nav--vertical').attributes('style')).toContain('flex-basis: 50px');
		wrapper.unmount();
	});
});
