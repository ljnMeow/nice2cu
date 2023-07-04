import { ExtractPropTypes, PropType } from 'vue';

function positionValidator(position: string): boolean {
	return ['right-top', 'right-bottom', 'left-top', 'left-bottom'].includes(position);
}

export const BadgeProps = {
	content: {
		type: [String, Number],
		default: 0,
	},
	hidden: {
		type: Boolean,
		default: false,
	},
	dot: {
		type: Boolean,
		default: false,
	},
	maxValue: {
		type: Number,
		default: 99,
	},
	color: {
		type: String,
		default: '#ee0a24',
	},
	position: {
		type: String as PropType<'right-top' | 'right-bottom' | 'left-top' | 'left-bottom'>,
		default: 'right-top',
		validator: positionValidator,
	},
};

export type BadgePropsType = ExtractPropTypes<typeof BadgeProps>;
