import { ExtractPropTypes, PropType } from 'vue';

export function typeValidator(type: string): boolean {
	return ['circle', 'time', 'wave', 'point', 'rever', 'bounce', 'battery'].includes(type);
}

export function sizeValidator(type: string): boolean {
	return ['mini', 'normal', 'small', 'large'].includes(type);
}

export const LoadingProps = {
	type: {
		type: String as PropType<'circle' | 'time' | 'wave' | 'point' | 'rever' | 'bounce' | 'battery'>,
		default: 'circle',
		validator: typeValidator,
	},
	color: {
		type: String,
	},
	loading: {
		type: Boolean,
		default: true,
	},
	size: {
		type: String as PropType<'mini' | 'normal' | 'small' | 'large'>,
		default: 'normal',
	},
	text: {
		type: String,
		default: '',
	},
	parallel: {
		type: Boolean,
		default: false,
	},
	loadingAbsolute: {
		type: Boolean,
		default: true,
	},
	showMask: {
		type: Boolean,
		default: true,
	},
};

export type LoadingPropsType = ExtractPropTypes<typeof LoadingProps>;
