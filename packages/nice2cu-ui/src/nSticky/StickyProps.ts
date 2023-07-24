import { ExtractPropTypes, PropType } from 'vue';

function positionValidator(position: string): boolean {
	return ['top', 'bottom'].includes(position);
}

export const StickyProps = {
	position: {
		type: String as PropType<'top' | 'bottom'>,
		default: 'top',
		validator: positionValidator,
	},
	top: {
		type: [Number, String],
		default: 0,
	},
	bottom: {
		type: [Number, String],
		default: 0,
	},
	zIndex: {
		type: [Number, String],
		default: 99,
	},
};

export type StickyPropsType = ExtractPropTypes<typeof StickyProps>;
