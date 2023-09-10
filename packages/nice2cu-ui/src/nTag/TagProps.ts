import { ExtractPropTypes, PropType } from 'vue';

const typeValidator = (position: string) => {
	return ['primary', 'success', 'danger', 'warning', 'default'].includes(position);
};

const sizeValidator = (position: string) => {
	return ['normal', 'mini', 'small', 'large'].includes(position);
};

export const TagProps = {
	type: {
		type: String as PropType<'primary' | 'success' | 'danger' | 'warning' | 'default'>,
		default: 'default',
		validator: typeValidator,
	},
	size: {
		type: String as PropType<'normal' | 'mini' | 'small' | 'large'>,
		default: 'normal',
		validator: sizeValidator,
	},
	color: {
		type: String,
		default: '',
	},
	textColor: {
		type: String,
		default: '',
	},
	plain: {
		type: Boolean,
		default: false,
	},
	round: {
		type: Boolean,
		default: false,
	},
	closeable: {
		type: Boolean,
		default: false,
	},
	closeName: {
		type: String,
		default: 'n-sey-garbage-sharp',
	},
	classPrefix: {
		type: String,
		default: 'nice2cu-icon',
	},
	onClose: {
		type: Function as PropType<(e: Event) => void | Promise<any>>,
	},
};

export type TagPropsType = ExtractPropTypes<typeof TagProps>;
