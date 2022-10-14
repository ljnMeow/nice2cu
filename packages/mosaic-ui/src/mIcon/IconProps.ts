import { ExtractPropTypes, PropType } from 'vue';

export const IconProps = {
	icon: {
		type: String,
		required: true,
	},
	classPrefix: {
		type: String,
		default: () => 'mosaic-icon',
	},
	margin: [String, Number] as PropType<string | number>,
	badge: [Boolean, Number, String] as PropType<boolean | number | string>,
	multicolor: Boolean,
	color: String,
	size: [String, Number] as PropType<string | number>,
} as const;

export type IconProps = ExtractPropTypes<typeof IconProps>;
