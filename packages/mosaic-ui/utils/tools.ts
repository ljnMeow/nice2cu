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
		if (size.includes('px') || size.includes('rem') || size.includes('em') || size.includes('vw')) {
			return size;
		} else {
			return `${size}px`;
		}
	}
};
