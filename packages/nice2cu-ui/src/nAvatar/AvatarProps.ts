import { ExtractPropTypes, PropType } from 'vue';
import { isString, isNumber } from '../../utils/tools';

export const innerSize = (size: any): boolean => {
	return ['mini', 'small', 'normal', 'large'].includes(size);
};

const sizeValidator = (size: any): boolean => {
	return innerSize(size) || isString(size) || isNumber(size);
};

const fitValidator = (fit: string): boolean => {
	return ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(fit);
};

export const AvatarProps = {
	round: {
		type: Boolean,
		default: true,
	},
	size: {
		type: [String, Number] as PropType<'mini' | 'small' | 'normal' | 'large' | number | string>,
		validator: sizeValidator,
		default: 'normal',
	},
	alt: {
		type: String,
	},
	color: {
		type: String,
	},
	src: {
		type: String,
	},
	fit: {
		type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
		validator: fitValidator,
		default: 'cover',
	},
	bordered: {
		type: Boolean,
		default: false,
	},
	borderColor: {
		type: String,
	},
	loading: {
		type: String,
	},
	error: {
		type: String,
	},
	lazy: {
		type: Boolean,
		default: false,
	},
	onLoad: {
		type: Function as PropType<(e: Event) => void | Promise<any>>,
	},
	onError: {
		type: Function as PropType<(e: Event) => void | Promise<any>>,
	},
	onClick: {
		type: Function as PropType<(e: Event) => void | Promise<any>>,
	},
};

export type AvatarPropsType = ExtractPropTypes<typeof AvatarProps>;
