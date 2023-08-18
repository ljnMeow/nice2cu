import { ExtractPropTypes, PropType } from 'vue';

export const TabsProps = {
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
	shadowBottom: {
		type: Boolean,
		default: false,
	},
	shadowColor: {
		type: String,
		default: 'rgba(0, 0, 0, 0.3)',
	},
	scroll: {
		type: Boolean,
		default: false,
	},
	lineAnimated: {
		type: Boolean,
		default: true,
	},
	wrapperAnimated: {
		type: Boolean,
		default: true,
	},
	wrapperHeight: {
		type: Number,
		default: 160,
	},
	touchable: {
		type: Boolean,
		default: false,
	},
	vertical: {
		type: Boolean,
		default: false,
	},
	leftWidth: {
		type: String,
		default: '100px',
	},
} as const;

export type TabsPropsType = ExtractPropTypes<typeof TabsProps>;
