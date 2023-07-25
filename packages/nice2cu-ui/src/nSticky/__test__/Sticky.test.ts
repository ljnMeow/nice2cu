import { expect, describe, test } from 'vitest';
import { ComponentPublicInstance, createApp, nextTick } from 'vue';
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils';

import nSticky from '../';
import nStickyVue from '../Sticky.vue';

function getTouch(el: Element | Window, x: number, y: number) {
	return {
		identifier: Date.now(),
		target: el,
		pageX: x,
		pageY: y,
		clientX: x,
		clientY: y,
		radiusX: 2.5,
		radiusY: 2.5,
		rotationAngle: 10,
		force: 0.5,
	};
}

function trigger(
	wrapper: VueWrapper<ComponentPublicInstance<any, any, any>> | DOMWrapper<Element> | Element | Window,
	eventName: string,
	x = 0,
	y = 0,
	offsetX = 0,
	offsetY = 0
) {
	const el = 'element' in wrapper ? wrapper.element : wrapper;
	const touchList = [getTouch(el, x, y)];

	const event = new CustomEvent(eventName, { bubbles: true, cancelable: true, detail: {} });

	Object.assign(event, {
		clientX: x,
		clientY: y,
		offsetX,
		offsetY,
		touches: touchList,
		targetTouches: touchList,
		changedTouches: touchList,
	});

	el.dispatchEvent(event);

	return nextTick();
}

const mockRect = (top: number) => {
	const origin = HTMLElement.prototype.getBoundingClientRect;
	Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
		configurable: true,
		value: () => ({ top, left: 0 }),
	});

	return {
		restore() {
			Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
				configurable: true,
				value: origin,
			});
		},
	};
};

test('test sticky plugin', () => {
	const app = createApp({}).use(nSticky);
	expect(app.component((nSticky as { name: string }).name)).toBeTruthy();
});

describe('test sticky component props', () => {
	test('test sticky top', async () => {
		let rect = mockRect(200);
		const wrapper = mount(nStickyVue, {
			props: {
				top: 100,
			},
		});

		expect(wrapper.find('.n-sticky--container').attributes('style')).toBe(undefined);
		rect.restore();

		rect = mockRect(90);
		await trigger(window, 'scroll');
		expect(wrapper.find('.n-sticky--container').attributes('style')).toContain('top: 100px;');
		wrapper.unmount();
		rect.restore();
	});
});
