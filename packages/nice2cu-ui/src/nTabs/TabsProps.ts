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
		default: false,
	},
} as const;

export type TabsPropsType = ExtractPropTypes<typeof TabsProps>;
