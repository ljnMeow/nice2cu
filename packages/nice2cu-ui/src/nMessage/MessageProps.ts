import { ExtractPropTypes, PropType, VNode } from 'vue';

const typeValidator = (position: string) => {
	return ['default', 'success', 'warning', 'info', 'error'].includes(position);
};

export const MessageProps = {
	type: {
		type: String as PropType<'default' | 'success' | 'warning' | 'info' | 'error'>,
		default: 'default',
		validator: typeValidator,
	},
	content: {
		type: [String, Function, Object] as PropType<string | VNode | ((h: any) => VNode)>,
		defualt: '',
	},
	duration: {
		type: Number,
		default: 2000,
	},
};

export type MessagePropsType = ExtractPropTypes<typeof MessageProps>;
