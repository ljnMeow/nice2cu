import { ExtractPropTypes, PropType, VNode } from 'vue';

const typeValidator = (position: string) => {
	return ['default', 'success', 'warning', 'info', 'error'].includes(position);
};

export const MessageProps = {
	id: {
		type: [String, Number],
		default: '',
	},
	type: {
		type: String as PropType<'default' | 'success' | 'warning' | 'info' | 'error'>,
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
	offset: {
		type: [String, Number],
		default: 40,
	},
	zIndex: {
		type: Number,
		default: 9999,
	},
	icon: {
		type: String,
		default: '',
	},
	iconSize: {
		type: [String, Number],
		default: '18px',
	},
	iconPrefix: {
		type: String,
		default: 'nice2cu-icon',
	},
	loading: {
		type: Boolean,
		default: false,
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
	clearMessage: Function,
	onClose: Function,
};

export type MessagePropsType = ExtractPropTypes<typeof MessageProps>;
