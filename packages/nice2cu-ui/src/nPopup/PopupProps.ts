import { CSSProperties, ExtractPropTypes, PropType } from 'vue';

export function positionValidator(position: string): boolean {
	return ['top', 'bottom', 'left', 'right', 'center'].includes(position);
}

export const PopupProps = {
	visible: {
		type: Boolean,
		default: false,
	},
	position: {
		type: String,
		default: 'center',
		validator: positionValidator,
	},
	transition: {
		type: String,
		default: '',
	},
	width: {
		type: [String, Number],
		default: '70%',
	},
	height: {
		type: [String, Number],
		default: '30%',
	},
	wrapper: {
		type: [String, Element],
		default: 'body',
	},
	wrapperDisabled: {
		type: Boolean,
		defailt: false,
	},
	round: {
		type: Boolean,
		default: false,
	},
	showMask: {
		type: Boolean,
		default: true,
	},
	maskClickClose: {
		type: Boolean,
		default: true,
	},
	maskClickFun: {
		type: Function,
	},
	maskClass: {
		type: String,
		default: '',
	},
	maskStyle: {
		type: Object as PropType<CSSProperties>,
		default: {},
	},
	popClass: {
		type: String,
		default: '',
	},
	popStyle: {
		type: Object,
		default: {},
	},
	zIndex: {
		type: Number,
		default: 2000,
	},
};

export type PopupPropsType = ExtractPropTypes<typeof PopupProps>;
