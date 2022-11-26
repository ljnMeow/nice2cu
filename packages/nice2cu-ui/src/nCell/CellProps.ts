import { ExtractPropTypes, PropType } from 'vue';

function arrowDirectionValidator(type: string): boolean {
	return ['', 'right', 'up', 'down'].includes(type);
}

export const CellProps = {
	title: {
		type: [String, Number],
		default: '',
	},
	description: {
		type: [String, Number],
		default: '',
	},
	icon: {
		type: String,
		default: '',
	},
	iconPrefix: {
		type: String,
		default: 'nice2cu-icon',
	},
	extra: {
		type: String,
		default: '',
	},
	iconSize: {
		type: [String, Number],
		default: 16,
	},
	showArrow: {
		type: String as PropType<'' | 'right' | 'up' | 'down'>,
		default: '',
		validator: arrowDirectionValidator,
	},
	border: {
		type: Boolean,
		default: false,
	},
	iconClass: {
		type: Array<string>,
		default: [],
	},
	titleClass: {
		type: Array<string>,
		default: [],
	},
	descriptionClass: {
		type: Array<string>,
		default: [],
	},
	extraClass: {
		type: Array<string>,
		default: [],
	},
	isRipple: {
		type: Boolean,
		default: false,
	},
	url: {
		type: String,
		default: '',
	},
	link: {
		type: String,
		default: '',
	},
	onClick: {
		type: Function as PropType<(e: Event) => void | Promise<any>>,
	},
};

export type CellProps = ExtractPropTypes<typeof CellProps>;
