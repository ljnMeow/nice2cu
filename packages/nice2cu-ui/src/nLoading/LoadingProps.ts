import { ExtractPropTypes, PropType } from 'vue';

export type LoadingType = 'circle';

export function typeValidator(type: string): boolean {
	return ['circle'].includes(type);
}

export const LoadingProps = {
	type: {
		type: String as PropType<LoadingType>,
		default: 'circle',
		validator: typeValidator,
	},
	color: {
		type: String,
	},
	loading: {
		type: Boolean,
		default: false,
	},
	size: {
		type: [String, Number],
		default: 20,
	},
	text: {
		type: String,
	},
};

export type LoadingProps = ExtractPropTypes<typeof LoadingProps>;
