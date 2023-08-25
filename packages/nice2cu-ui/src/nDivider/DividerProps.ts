import { ExtractPropTypes, PropType } from 'vue';

const contentPositionValidator = (position: string) => {
	return ['left', 'center', 'right'].includes(position);
};

export const DividerProps = {
	vertical: {
		type: Boolean,
		default: false,
	},
	contentPosition: {
		type: String as PropType<'left' | 'center' | 'right'>,
		default: 'center',
		validator: contentPositionValidator,
	},
	dashed: {
		type: Boolean,
		default: false,
	},
	hairline: {
		type: Boolean,
		default: false,
	},
	customStyle: {
		type: Object,
		default: {},
	},
};

export type DividerPropsType = ExtractPropTypes<typeof DividerProps>;
