import { ExtractPropTypes, PropType } from 'vue';

export const BottomNavBarProps = {
	active: {
		type: [Number, String] as PropType<number | string>,
		default: 0,
	},
	activeColor: {
		type: String,
	},
	defaultColor: {
		type: String,
	},
	background: {
		type: String,
		default: '#ffffff',
	},
	shadowTop: {
		type: Boolean,
		default: false,
	},
	shadowColor: {
		type: String,
		default: 'rgba(0, 0, 0, 0.3)',
	},
	fixedBottom: {
		type: Boolean,
		default: false,
	},
	safeAreaInsetBottom: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: Boolean,
		default: false,
	},
	scroll: {
		type: Boolean,
		default: false,
	},
	onBeforeChange: {
		type: Function as PropType<(value: string | number) => boolean | Promise<any>>,
	},
} as const;

export type BottomNavBarPropsType = ExtractPropTypes<typeof BottomNavBarProps>;
