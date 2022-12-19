import { ExtractPropTypes, PropType } from 'vue';

const fitValidator = (type: string) => {
	return ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(type);
};

export const ImageProps = {
	src: {
		type: String,
		default: '',
	},
	alt: {
		type: String,
		default: '',
	},
	title: {
		type: String,
		default: '',
	},
	width: {
		type: [String, Number],
		default: '',
	},
	height: {
		type: [String, Number],
		default: '',
	},
	radius: {
		type: [String, Number],
		default: '',
	},
	block: {
		type: Boolean,
		default: false,
	},
	lazy: {
		type: Boolean,
		default: false,
	},
	loading: {
		type: String,
		default: null,
	},
	error: {
		type: String,
		default: null,
	},
	onLoad: {
		type: Function as PropType<(e: Event) => void | Promise<any>>,
	},
	onError: {
		type: Function as PropType<(e: Event) => void | Promise<any>>,
	},
	fit: {
		type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
		default: 'fill',
		validator: fitValidator,
	},
};

export type ImageProps = ExtractPropTypes<typeof ImageProps>;
