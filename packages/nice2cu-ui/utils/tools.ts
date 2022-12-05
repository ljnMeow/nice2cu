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
