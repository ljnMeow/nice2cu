import { expect, describe, test } from 'vitest';
import { createApp, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { delay } from '../../../utils/tools';
import { SwiperState } from '../SwiperProps';

document.body.innerHTML = '<script></script>';

import nSwiper from '../';
import nswiperVue from '../Swiper.vue';
import nSwiperItem from '../../nSwiperItem';
import nSwiperItemVue from '../../nSwiperItem/SwiperItem.vue';

const Wrapper = {
	components: {
		[nSwiper.name]: nSwiper,
		[nSwiperItem.name]: nSwiperItem,
	},
	data: () => ({
		active: 0,
		swiper: null,
	}),
	template: `
        <n-swiper ref="swiper" v-model:active="active" style="width: 100px; height: 100px">
            <n-swiper-item>1</n-swiper-item>
            <n-swiper-item>2</n-swiper-item>
            <n-swiper-item>3</n-swiper-item>
        </n-swiper>
    `,
};

interface SwiperRef {
	prev: () => void;
	next: () => void;
	jump: (index: number) => void;
	state: SwiperState;
}

test('test Swiper plugin', () => {
	const app = createApp({}).use(nSwiper).use(nSwiperItem);
	expect(app.component((nSwiper as { name: string }).name)).toBeTruthy();
	expect(app.component((nSwiperItem as { name: string }).name)).toBeTruthy();
});

test('test Swiper method, prev & next & jump', async () => {
	const wrapper = mount(Wrapper);

	const { prev, next, jump, state } = wrapper.vm.$refs.swiper as SwiperRef;

	jump(0);
	expect(state.active).toBe(0);
	expect(wrapper.findAll('.n-swiper__dot')[0].classes()).toContain('n-swiper__dot--active');

	next();
	expect(state.active).toBe(1);
	await delay(100);
	expect(wrapper.findAll('.n-swiper__dot')[1].classes()).toContain('n-swiper__dot--active');

	prev();
	expect(state.active).toBe(0);
	await delay(100);
	expect(wrapper.findAll('.n-swiper__dot')[0].classes()).toContain('n-swiper__dot--active');

	jump(2);
	expect(state.active).toBe(2);
	await delay(100);
	expect(wrapper.findAll('.n-swiper__dot')[2].classes()).toContain('n-swiper__dot--active');

	next();
	expect(state.active).toBe(0);
	await delay(100);
	expect(wrapper.findAll('.n-swiper__dot')[0].classes()).toContain('n-swiper__dot--active');

	prev();
	expect(state.active).toBe(2);
	await delay(100);
	expect(wrapper.findAll('.n-swiper__dot')[2].classes()).toContain('n-swiper__dot--active');

	wrapper.unmount();
});

describe('test Swiper props', () => {
	test('test Swiper touchable', () => {
		const wrapper = mount(Wrapper, {
			props: {
				touchable: false,
			},
		});

		const { state } = wrapper.vm.$refs.swiper as SwiperRef;

		const track = wrapper.find('.n-swiper__wrapper');

		track.trigger('drag');

		expect(state.active).toBe(0);
	});
	test('test Swiper autoplay', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				autoPlay: 100,
			},
		});

		const { state } = wrapper.vm.$refs.swiper as SwiperRef;

		await delay(700);
		expect(state.active).toBe(1);
		expect(wrapper.findAll('.n-swiper__dot')[1].classes()).toContain('n-swiper__dot--active');
		await delay(100);
		expect(state.active).toBe(2);
		expect(wrapper.findAll('.n-swiper__dot')[2].classes()).toContain('n-swiper__dot--active');

		wrapper.unmount();
	});
	test('test swiper duration', () => {
		const wrapper = mount(Wrapper, {
			props: {
				duration: 500,
			},
		});

		expect(wrapper.find('.n-swiper__wrapper').attributes('style')).toContain('transition-duration: 500ms;');
		wrapper.unmount();
	});
	test('test swiper loop', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				loop: false,
			},
		});

		const { state } = wrapper.vm.$refs.swiper as SwiperRef;

		const track = wrapper.find('.n-swiper__wrapper');

		await track.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] });
		await track.trigger('touchmove', { touches: [{ clientX: 100, clientY: 0 }] });
		await track.trigger('touchend');
		expect(state.active).toBe(0);
		expect(wrapper.findAll('.n-swiper__dot')[0].classes()).toContain('n-swiper__dot--active');

		await track.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] });
		await track.trigger('touchmove', { touches: [{ clientX: -100, clientY: 0 }] });
		await track.trigger('touchend');
		expect(state.active).toBe(1);
		expect(wrapper.findAll('.n-swiper__dot')[1].classes()).toContain('n-swiper__dot--active');

		await track.trigger('touchstart', { touches: [{ clientX: -100, clientY: 0 }] });
		await track.trigger('touchmove', { touches: [{ clientX: -200, clientY: 0 }] });
		await track.trigger('touchend');
		expect(state.active).toBe(2);
		expect(wrapper.findAll('.n-swiper__dot')[2].classes()).toContain('n-swiper__dot--active');

		await track.trigger('touchstart', { touches: [{ clientX: -200, clientY: 0 }] });
		await track.trigger('touchmove', { touches: [{ clientX: -300, clientY: 0 }] });
		await track.trigger('touchend');
		expect(state.active).toBe(2);
		expect(wrapper.findAll('.n-swiper__dot')[2].classes()).toContain('n-swiper__dot--active');

		wrapper.unmount();
	});
	test('test swiper hasdot and dotColor', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				hasdot: true,
				dotColor: 'red',
			},
		});
		expect(wrapper.find('.n-swiper__dots').exists()).toBe(true);
		wrapper.findAll('.n-swiper__dot').forEach((item) => {
			expect(item.attributes().style).toContain('background-color: red');
		});

		await wrapper.setProps({ hasdot: false });
		expect(wrapper.find('.n-swiper__dots').exists()).toBe(false);

		wrapper.unmount();
	});
	test('test swiper hasDirector and directorColor', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				hasDirector: true,
				directorColor: 'red',
			},
		});

		wrapper.findAll('.n-swiper-director').forEach((directorItem) => {
			expect(directorItem.exists()).toBe(true);
			expect(directorItem.find('.n-icon').attributes().style).toContain('color: red');
		});

		await wrapper.setProps({ hasDirector: false });

		wrapper.findAll('.n-swiper-director').forEach((directorItem) => {
			expect(directorItem.exists()).toBe(false);
		});

		wrapper.unmount();
	});
	test('test swiper vertical', async () => {
		const wrapper = mount(Wrapper, {
			props: {
				vertical: true,
			},
		});

		expect(wrapper.find('.n-swiper__wrapper').classes()).toContain('n-swiper__wrapper--vertical');

		wrapper.unmount();
	});
});
