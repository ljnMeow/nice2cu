import { ExtractPropTypes, PropType } from 'vue';

export const IconProps = {
	icon: {
		type: String,
		required: true,
	},
	classPrefix: {
		type: String,
		default: () => 'nice2cu-icon',
	},
	margin: [String, Number] as PropType<string | number>,
	badge: [Boolean, Number, String] as PropType<boolean | number | string>,
	svg: Boolean,
	color: String,
	size: [String, Number] as PropType<string | number>,
} as const;

export type IconProps = ExtractPropTypes<typeof IconProps>;
