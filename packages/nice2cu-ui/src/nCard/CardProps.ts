import { ExtractPropTypes, PropType } from 'vue';

const fitValidator = (type: string) => {
	return ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(type);
};

const layoutValidator = (type: string) => {
	return ['horizontal', 'vertical'].includes(type);
};

export const CardProps = {
	outline: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		default: '',
	},
	isTitleEllipsis: {
		type: Boolean,
		default: false,
	},
	subtitle: {
		type: String,
		default: '',
	},
	isSubtitleEllipsis: {
		type: Boolean,
		default: false,
	},
	description: {
		type: String,
		default: '',
	},
	src: {
		type: String,
		default: '',
	},
	alt: {
		type: String,
		default: '',
	},
	fit: {
		type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
		default: 'cover',
		validator: fitValidator,
	},
	imageHeight: [String, Number],
	imageWidth: [String, Number],
	layout: {
		type: String as PropType<'horizontal' | 'vertical'>,
		default: 'vertical',
		validator: layoutValidator,
	},
};

export type CardPropsType = ExtractPropTypes<typeof CardProps>;
