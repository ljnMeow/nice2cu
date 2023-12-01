import { ExtractPropTypes, PropType, VNode } from 'vue';

const typeValidator = (position: string) => {
	return ['default', 'success', 'warning', 'error'].includes(position);
};

export function loadingTypeValidator(type: string): boolean {
	return ['circle', 'time', 'wave', 'point', 'rever', 'bounce', 'battery'].includes(type);
}

export const ToastProps = {
	id: {
		type: [String, Number],
		default: '',
	},
	type: {
		type: String as PropType<'default' | 'success' | 'warning' | 'error'>,
		default: 'default',
		validator: typeValidator,
	},
	content: {
		type: [String, Function, Object] as PropType<string | VNode | ((h: any) => VNode)>,
		defualt: '',
	},
	duration: {
		type: Number,
		default: 2000,
	},
	customStyle: {
		type: Object,
		default: {},
	},
	icon: {
		type: String,
		defalt: '',
	},
	iconSize: {
		type: [String, Number],
		default: '36px',
	},
	iconPrefix: {
		type: String,
		default: 'nice2cu-icon',
	},
	loading: {
		type: Boolean,
		default: false,
	},
	loadingType: {
		type: String as PropType<'circle' | 'time' | 'wave' | 'point' | 'rever' | 'bounce' | 'battery'>,
		default: 'circle',
		validator: loadingTypeValidator,
	},
	hasMask: {
		type: Boolean,
		default: false,
	},
	maskColor: {
		type: String,
		default: 'transparent',
	},
	clickMaskClose: {
		type: Boolean,
		defult: false,
	},
	wrapper: {
		type: String,
		default: 'body',
	},
	clearToast: Function,
	onClose: Function,
};

export type ToastPropsType = ExtractPropTypes<typeof ToastProps>;
