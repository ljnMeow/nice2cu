import { ExtractPropTypes, PropType } from 'vue';

export const NavBarProps = {
	height: {
		type: String,
		default: '46px',
	},
	shadowButtom: {
		type: Boolean,
		default: false,
	},
	shadowColor: {
		type: String,
		default: 'rgba(0, 0, 0, 0.3)',
	},
	background: {
		type: String,
		default: '#ffffff',
	},
	title: {
		type: String,
		default: '',
	},
	textColor: {
		type: String,
		default: '#333333',
	},
	showLeft: {
		type: Boolean,
		default: false,
	},
	leftText: {
		type: String,
		default: '返回',
	},
	leftIcon: {
		type: String,
		default: 'n-left',
	},
	showRight: {
		type: Boolean,
		default: false,
	},
	rightText: {
		type: String,
		default: '',
	},
	rightIcon: {
		type: String,
		default: '',
	},
	iconSize: {
		type: [String, Number] as PropType<string | number>,
		default: '20px',
	},
	classPrefix: {
		type: String,
		default: 'nice2cu-icon',
	},
	fixedTop: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: Boolean,
		default: false,
	},
	leftClick: {
		type: Function as PropType<(e: Event) => void | Promise<any>>,
	},
	rightClick: {
		type: Function as PropType<(e: Event) => void | Promise<any>>,
	},
} as const;

export type NavBarPropsType = ExtractPropTypes<typeof NavBarProps>;
