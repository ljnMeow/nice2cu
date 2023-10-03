import { Fragment, VNode } from 'vue';

// 类型
type ScrollElement = HTMLElement | Window;

// 常量
const defaultRoot = window;
const overflowScrollReg = /scroll|auto|overlay/i;

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

export const isPromise = (val: unknown): val is Promise<any> => val instanceof Promise;

export const isSameVNodeType = (node1: VNode, node2: VNode) => node1.type === node2.type && node1.key === node2.key;

export const isElement = (node: Element) => {
	const ELEMENT_NODE_TYPE = 1;
	return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
};

/**
 * @function handleUnit
 * @description 单位判断，带单位直接返回，不带单位默认返回px
 * @param size
 * @returns string | number
 */
export const handleUnit = (size: string | number | undefined) => {
	if (!size) return;
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
 * @function convertToNumber
 * @description 将带单位数值转换成number
 * @param value
 * @returns number
 */
export const convertToNumber = (value: string): number => {
	// 如果传入的不是字符串类型，则直接返回
	if (typeof value !== 'string') {
		return value;
	}

	// 使用正则表达式匹配数值和单位
	const match = value.match(/^([+-]?\d*\.?\d+)(px|rem|em)?$/);

	// 如果没有匹配到数值，则直接返回
	if (!match) {
		return NaN;
	}

	// 将匹配到的数值转换为数字类型
	const numberValue = parseFloat(match[1]);

	// 如果没有匹配到单位，则直接返回数字类型的数值
	if (!match[2]) {
		return numberValue;
	}

	// 根据单位类型进行转换
	switch (match[2]) {
		case 'px':
			return numberValue;
		case 'rem':
			return numberValue * parseFloat(getComputedStyle(document.documentElement).fontSize);
		case 'em':
			return numberValue * parseFloat(getComputedStyle(document.body).fontSize);
		default:
			return NaN;
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

/**
 * @function getScrollParent
 * @description 获取滚动父容器
 * @param el
 * @param root
 * @returns HTMLElement
 */
export const getScrollParent = (el: HTMLElement, root: ScrollElement | undefined = defaultRoot) => {
	let node = el;

	while (node && node !== root && isElement(node)) {
		const { overflowY } = window.getComputedStyle(node);
		if (overflowScrollReg.test(overflowY)) {
			return node;
		}
		node = node.parentNode as HTMLElement;
	}

	return root;
};

/**
 * @function filterFragment
 * @description 过滤掉Fragment类型节点
 * @param children
 * @returns VNode[]
 */
export const filterFragment = (children: VNode[] = []) => {
	const result: VNode[] = [];

	children.forEach((vNode: any) => {
		if (vNode.type === Comment) {
			return;
		}

		if (vNode.type === Fragment && isArray(vNode.children)) {
			vNode.children.forEach((item: VNode) => {
				result.push(item);
			});
			return;
		}

		result.push(vNode);
	});

	return result;
};

/**
 * @function waitingScreenRedrawn
 * @description 确保在两次重绘后执行操作
 * @returns Promise
 */
export const waitingScreenRedrawn = () => {
	return new Promise((resolve) => {
		requestAnimationFrame(() => {
			requestAnimationFrame(resolve);
		});
	});
};
