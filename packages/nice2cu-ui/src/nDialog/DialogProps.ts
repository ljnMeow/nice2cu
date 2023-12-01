import { ExtractPropTypes, PropType } from 'vue';

export const DialogProps = {
	showMask: {
		type: Boolean,
		default: true,
	},
};

export type DialogPropsType = ExtractPropTypes<typeof DialogProps>;
