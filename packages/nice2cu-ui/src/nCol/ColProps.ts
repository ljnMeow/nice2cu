import { ExtractPropTypes, PropType } from 'vue';

function directionValidator(direction: string) {
	return ['row', 'column'].includes(direction);
}

export type ColDirection = 'row' | 'column';

export type ColSizeDescriptor = {
	span?: number | string;
	offset?: number | string;
};

export const ColProps = {
	span: {
		type: [String, Number],
		default: 24,
	},
	offset: {
		type: [String, Number],
		default: 0,
	},
	direction: {
		type: String as PropType<ColDirection>,
		default: 'row',
		validator: directionValidator,
	},
};

export type ColProps = ExtractPropTypes<typeof ColProps>;
