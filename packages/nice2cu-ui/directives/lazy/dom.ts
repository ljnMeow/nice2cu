const inBrowser = typeof window !== 'undefined';

function checkIntersectionObserver(): boolean {
	if (
		inBrowser &&
		'IntersectionObserver' in window &&
		'IntersectionObserverEntry' in window &&
		'intersectionRatio' in IntersectionObserverEntry.prototype
	) {
		if (!('isIntersecting' in IntersectionObserverEntry.prototype)) {
			Object.defineProperty(IntersectionObserverEntry.prototype, 'isIntersecting', {
				get: function (this: IntersectionObserverEntry) {
					return this.intersectionRatio > 0;
				},
			});
		}
		return true;
	}
	return false;
}

export const hasIntersectionObserver = checkIntersectionObserver();

const style = (el: HTMLElement, prop: string): string => {
	return getComputedStyle(el).getPropertyValue(prop);
};

const overflow = (el: HTMLElement): string => {
	return style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x');
};

export function scrollParent(el: HTMLElement): HTMLElement | Window {
	let parent = el;
	while (parent) {
		if (parent === document.body || parent === document.documentElement) {
			break;
		}
		if (!parent.parentNode) {
			break;
		}
		if (/(scroll|auto)/.test(overflow(parent))) {
			return parent;
		}
		parent = parent.parentNode as HTMLElement;
	}
	return window;
}

export const imageLoad = (src: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		const image = new Image();

		image.onload = function (e) {
			resolve(e);
			dispose();
		};

		image.onerror = function (e) {
			reject(e);
			dispose();
		};

		image.src = src;

		function dispose() {
			image.onload = image.onerror = null;
		}
	});
};
