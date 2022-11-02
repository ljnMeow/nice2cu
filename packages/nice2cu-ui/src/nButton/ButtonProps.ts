import { ExtractPropTypes, PropType } from 'vue';

function typeValidator(type: string): boolean {
	return ['default', 'primary', 'info', 'success', 'warning', 'danger'].includes(type);
}

function sizeValidator(size: string): boolean {
	return ['normal', 'mini', 'small', 'large'].includes(size);
}

export const ButtonProps = {
	type: {
		type: String as PropType<'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'>,
		default: 'default',
		validator: typeValidator,
	},
	size: {
		type: String as PropType<'normal' | 'mini' | 'small' | 'large'>,
		default: 'normal',
		validator: sizeValidator,
	},
	border: {
		type: Boolean,
		default: false,
	},
	shape: {
		type: String as PropType<'round' | 'square' | 'radius'>,
		default: 'radius',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	block: {
		type: Boolean,
		default: false,
	},
	isRipple: {
		type: Boolean,
		default: false,
	},
};

export type ButtonProps = ExtractPropTypes<typeof ButtonProps>;
