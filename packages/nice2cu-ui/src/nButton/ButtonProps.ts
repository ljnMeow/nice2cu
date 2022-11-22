import { ExtractPropTypes, PropType } from 'vue';

function typeValidator(type: string): boolean {
	return ['default', 'primary', 'info', 'success', 'warning', 'danger'].includes(type);
}

function sizeValidator(size: string): boolean {
	return ['normal', 'mini', 'small', 'large'].includes(size);
}

function loadingTypeValidator(type: string): boolean {
	return ['circle', 'time', 'wave', 'point', 'rever', 'bounce', 'battery'].includes(type);
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
	loading: {
		type: Boolean,
		default: false,
	},
	loadingText: {
		type: String,
		default: '',
	},
	loadingSize: {
		type: String as PropType<'normal' | 'mini' | 'small' | 'large'>,
		default: 'small',
		validator: sizeValidator,
	},
	loadingType: {
		type: String as PropType<'circle' | 'time' | 'wave' | 'point' | 'rever' | 'bounce' | 'battery'>,
		default: 'circle',
		validator: loadingTypeValidator,
	},
	bgColor: {
		type: String,
	},
	textColor: {
		type: String,
	},
	onClick: {
		type: Function as PropType<(e: Event) => void | Promise<any>>,
	},
};

export type ButtonProps = ExtractPropTypes<typeof ButtonProps>;
