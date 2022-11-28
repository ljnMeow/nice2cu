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
