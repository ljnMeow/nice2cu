import { ExtractPropTypes } from 'vue';

export const TabItemProps = {
	title: {
		type: String,
		default: '',
	},
	name: {
		type: String,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	icon: {
		type: String,
		default: '',
	},
	iconSize: {
		type: String,
		default: '20px',
	},
	classPrefix: {
		type: String,
		default: 'nice2cu-icon',
	},
	dot: {
		type: Boolean,
		default: false,
	},
	badge: {
		type: Number,
		default: 0,
	},
	badgeColor: {
		type: String,
		default: '#ee0a24',
	},
} as const;

export type TabItemPropsType = ExtractPropTypes<typeof TabItemProps>;
