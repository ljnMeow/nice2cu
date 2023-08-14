import { ExtractPropTypes, Ref, PropType } from 'vue';

function directorTypeValidator(directorType: string): boolean {
	return ['static', 'arrow'].includes(directorType);
}

export const SwiperProps = {
	active: {
		type: [Number, String],
		default: 0,
	},
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
	touchable: {
		type: Boolean,
		default: true,
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
	vertical: {
		type: Boolean,
		default: false,
	},
};

export type SwiperPropsType = ExtractPropTypes<typeof SwiperProps>;

export type SwiperState = {
	wrapperWidth: number;
	wrapperHeight: number;
	width: number;
	height: number;
	active: number;
	translate: number;
	lockDuration: boolean;
};

export type SwiperItemProvidType = {
	width: Ref<string | number>;
	height: Ref<string | number>;
	vertical: boolean;
};

export type SwiperExporeType = {
	prev: () => void;
	next: () => void;
	jump: (idx: number) => void;
	init: () => void;
	state: SwiperState;
};
