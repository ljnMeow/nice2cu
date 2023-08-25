import { ExtractPropTypes } from 'vue';

export const AvatarGroupProps = {
	offset: {
		type: [Number, String],
	},
	vertical: {
		type: Boolean,
		default: false,
	},
	maxLength: {
		type: Number,
		default: 3,
	},
};

export type AvatarGroupPropsType = ExtractPropTypes<typeof AvatarGroupProps>;
