import { describe, expect, test, vi } from 'vitest';
import { createApp } from 'vue';
import { mount } from '@vue/test-utils';

document.body.innerHTML = '<script></script>';

import nBottomNavBar from '../';
import nBottomNavBarVue from '../BottomNavBar.vue';

import nBottomNavBarItem from '../../nBottomNavBarItem';
import nBottomNavBarItemVue from '../../nBottomNavBarItem/BottomNavBarItem.vue';

const Wrapper = {
	components: {
		[nBottomNavBarVue.name]: nBottomNavBarVue,
		[nBottomNavBarItemVue.name]: nBottomNavBarItemVue,
	},
	data: () => ({
		active: 0,
	}),
	template: `
        <n-bottom-navbar v-model:active="active">
            <n-bottom-navbar-item icon="n-home-sharp">标签1</n-bottom-navbar-item>
            <n-bottom-navbar-item icon="n-calendar-sharp">标签2</n-bottom-navbar-item>
            <n-bottom-navbar-item icon="n-briefcase-sharp" :badge="100">标签3</n-bottom-navbar-item>
            <n-bottom-navbar-item icon="n-chatbox-ellipses-sharp">标签4</n-bottom-navbar-item>
            <n-bottom-navbar-item icon="n-bulb-sharp">标签5</n-bottom-navbar-item>
        </n-bottom-navbar>
    `,
};

describe('test BottomNavbarComponent plugin', () => {
	test('test BottomNavbar and BottomNavbarItem plugin', () => {
		const app = createApp({}).use(nBottomNavBar).use(nBottomNavBarItem);
		expect(app.component((nBottomNavBar as { name: string }).name)).toBeTruthy();
		expect(app.component((nBottomNavBarItem as { name: string }).name)).toBeTruthy();
	});
});

describe('test BottomNavbar props', () => {
	test('test BottomNavbar background', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				background: 'red',
			},
		});
		expect(wrapper.find('.n-bottom-navbar').attributes('style')).toContain('background: red');
		wrapper.unmount();
	});
	test('test BottomNavbar shadowTop', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				shadowTop: true,
			},
		});
		expect(wrapper.find('.n-bottom-navbar').attributes('style')).toContain('box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3)');
		wrapper.unmount();
	});
	test('test BottomNavbar shadowColor', async () => {
		const shadowColor = '#eea2a4';
		const wrapper = mount(Wrapper, {
			props: {
				shadowTop: true,
				shadowColor,
			},
		});
		expect(wrapper.find('.n-bottom-navbar').attributes('style')).toContain(`box-shadow: 0px 0px 4px 0px ${shadowColor}`);
		wrapper.unmount();
	});
	test('test BottomNavbar fixedBottom', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				fixedBottom: true,
			},
		});
		expect(wrapper.find('.n-bottom-navbar').classes()).toContain('n-bottom-navbar--fixed-bottom');
		wrapper.unmount();
	});
	test('test BottomNavbar safeAreaInsetBottom', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				safeAreaInsetBottom: true,
			},
		});
		expect(wrapper.find('.n-bottom-navbar').classes()).toContain('n-bottom-navbar--safe-bottom');
		wrapper.unmount();
	});
	test('test BottomNavbar placeholder', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				placeholder: true,
			},
		});
		expect(wrapper.find('.n-bottom-navbar-placeholder').exists()).toBe(true);
		wrapper.unmount();
	});
	test('test BottomNavbar activeColor', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				activeColor: 'red',
			},
		});
		expect(wrapper.find('.n-bottom-navbar-item--active').attributes('style')).toContain('color: red;');
		await wrapper.setProps({ activeColor: '#000000' });
		expect(wrapper.find('.n-bottom-navbar-item--active').attributes('style')).toContain('color: #000000;');
		wrapper.unmount();
	});
	test('test BottomNavbar defaultColor', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				defaultColor: 'red',
			},
		});
		wrapper.findAll('.n-bottom-navbar-item').forEach((item) => {
			if (item.attributes('style')) {
				expect(item.attributes('style')).toContain('color: red;');
			}
		});
		await wrapper.setProps({ defaultColor: '#000000' });
		wrapper.findAll('.n-bottom-navbar-item').forEach((item) => {
			if (item.attributes('style')) {
				expect(item.attributes('style')).toContain('color: #000000;');
			}
		});
		wrapper.unmount();
	});
	test('test BottomNavbar scroll', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				scroll: true,
			},
		});
		expect(wrapper.find('.n-bottom-navbar').classes()).toContain('n-bottom-navbar--scroll');
		wrapper.unmount();
	});
});

describe('test BottomNavbar events', () => {
	test('test BottomNavbar switch', async () => {
		let indexOrName;
		const switchNavbar = vi.fn((index) => {
			indexOrName = index;
		});
		const wrapper = mount({
			components: {
				[nBottomNavBarVue.name]: nBottomNavBarVue,
				[nBottomNavBarItemVue.name]: nBottomNavBarItemVue,
			},
			data: () => ({
				active: 0,
			}),
			methods: {
				switchNavbar,
			},
			template: `
				<n-bottom-navbar v-model:active="active" @switch="switchNavbar">
					<n-bottom-navbar-item icon="n-home-sharp">标签1</n-bottom-navbar-item>
					<n-bottom-navbar-item icon="n-bulb-sharp">标签5</n-bottom-navbar-item>
				</n-bottom-navbar>
			`,
		});
		const bottomNavbarItem0 = wrapper.findAll('.n-bottom-navbar-item')[1];
		bottomNavbarItem0.trigger('click');
		expect(switchNavbar).toHaveBeenCalledTimes(1);
		expect(indexOrName).toBe(1);

		wrapper.unmount();
	});
});
