import { ExtractPropTypes, PropType } from 'vue';

function directionValidator(direction: string): boolean {
	return ['start', 'center', 'end'].includes(direction);
}

export const EllipsisProps = {
	content: {
		type: String,
		default: '',
	},
	lineHeight: {
		type: String,
		default: '20px',
	},
	direction: {
		type: String as PropType<'start' | 'center' | 'end'>,
		validator: directionValidator,
		default: 'end',
	},
	rows: {
		type: Number,
		default: 1,
	},
	showExpand: {
		type: Boolean,
		default: false,
	},
	expandText: {
		type: String,
		default: '展开',
	},
	collapseText: {
		type: String,
		default: '收起',
	},
};

export type EllipsisPropsType = ExtractPropTypes<typeof EllipsisProps>;
