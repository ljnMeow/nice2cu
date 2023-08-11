import { ExtractPropTypes, Ref, PropType } from 'vue';

function directorTypeValidator(directorType: string): boolean {
	return ['static', 'arrow'].includes(directorType);
}

export const SwiperProps = {
	autoPlay: {
		type: [Number, String],
		default: 0,
	},
	duration: {
		type: Number,
		default: 300,
	},
	loop: {
		type: Boolean,
		default: true,
	},
	initIndex: {
		type: [Number, String],
		default: 0,
	},
	hasdot: {
		type: Boolean,
		default: true,
	},
	dotColor: {
		type: String,
		default: '#ffffff',
	},
	hasDirector: {
		type: Boolean,
		default: false,
	},
	directorColor: {
		type: String,
		default: '#ffffff',
	},
	directorType: {
		type: String as PropType<'static' | 'arrow'>,
		default: 'static',
		validator: directorTypeValidator,
	},
};

export type SwiperPropsType = ExtractPropTypes<typeof SwiperProps>;

export type SwiperItemProvidType = {
	width: Ref<string | number>;
};
