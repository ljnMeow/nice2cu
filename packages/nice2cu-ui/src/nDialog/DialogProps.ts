import { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';

export type DialogActionType = 'confirm' | 'cancel';

export const DialogProps = {
	id: {
		type: String,
		default: '',
	},
	visible: {
		type: Boolean,
		default: false,
	},
	wrapper: {
		type: [String, Element],
		default: 'body',
	},
	width: {
		type: [Number, String],
		default: '',
	},
	title: {
		type: String,
		default: '',
	},
	content: {
		type: [String, Function, Object] as PropType<string | VNode | ((h: any) => VNode)>,
		default: '',
	},
	round: {
		type: Boolean,
		default: true,
	},
	showCancelButton: {
		type: Boolean,
		default: false,
	},
	cancelButtonText: {
		type: String,
		default: '取消',
	},
	cancelButtonColor: {
		type: String,
		default: '#000000',
	},
	cancelButtonDisabled: {
		type: Boolean,
		default: false,
	},
	showConfirmButton: {
		type: Boolean,
		default: true,
	},
	confirmButtonText: {
		type: String,
		default: '确定',
	},
	confirmButtonColor: {
		type: String,
		default: '#1989fa',
	},
	confirmButtonDisabled: {
		type: Boolean,
		default: false,
	},
	showMask: {
		type: Boolean,
		default: true,
	},
	maskClickClose: {
		type: Boolean,
		default: false,
	},
	maskClass: {
		type: String,
		default: '',
	},
	maskStyle: {
		type: Object as PropType<CSSProperties>,
		default: {},
	},
	beforeClose: {
		type: Function as PropType<(action: DialogActionType) => Promise<boolean | undefined> | boolean>,
		default: undefined,
	},
	zIndex: {
		type: Number,
		default: 2000,
	},
	transition: {
		type: String,
		default: '',
	},
	footer: {
		type: Boolean,
		default: true,
	},
	clearDialog: {
		type: Function as PropType<(id: string) => void>,
	},
	// closeOnPopstate: {
	// 	type: Boolean,
	// 	default: false,
	// },
};

export type DialogPropsType = ExtractPropTypes<typeof DialogProps>;
