/**
 * @param val
 * @description 类型判断函数
 * @returns boolean
 */

export const isString = (val: unknown): val is string => typeof val === 'string';

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';

export const isNumber = (val: unknown): val is number => typeof val === 'number';

export const isObject = (val: unknown): val is Record<string, any> => typeof val === 'object' && val !== null;

export const isArray = (val: unknown): val is Array<any> => Array.isArray(val);

/**
 * @function handleUnit
 * @description 单位判断，带单位直接返回，不带单位默认返回px
 * @param size
 * @returns string | number
 */
export const handleUnit = (size: string | number) => {
	if (typeof size === 'number') {
		return `${size}px`;
	}
	if (typeof size === 'string') {
		if (size.includes('px') || size.includes('rem') || size.includes('em') || size.includes('vw') || size.includes('%')) {
			return size;
		} else {
			return `${size}px`;
		}
	}
};
/**
 * @function delay
 * @description 配合async await使用，让后面函数等待多长时间执行
 * @param time
 * @returns
 */

export const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

/**
 * @function throttle
 * @description 节流函数
 * @param fn 回调函数
 * @param delay 时间
 * @returns
 */

export const throttle = (fn: any, delay: number) => {
	let timeout = 0;
	let lastRun = 0;
	return function (this: void) {
		if (timeout) {
			return;
		}
		const elapsed = Date.now() - lastRun;
		const self = this;
		const args = arguments;
		const runCallback = function () {
			lastRun = Date.now();
			timeout = 0;
			fn.apply(self, args);
		};
		if (elapsed >= delay) {
			runCallback();
		} else {
			timeout = window.setTimeout(runCallback, delay);
		}
	};
};

/**
 * @function toNumber
 * @description 类型转换，将各种类型转换成number
 * @param val
 * @returns number
 */

export const toNumber = (val: number | string | boolean | undefined | null): number => {
	if (val == null) return 0;

	if (isString(val)) {
		val = parseFloat(val);
		val = Number.isNaN(val) ? 0 : val;
		return val;
	}

	if (isBoolean(val)) return Number(val);

	return val;
};
