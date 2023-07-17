import { ComputedRef, ExtractPropTypes, PropType, Ref, ComponentInternalInstance } from 'vue';

export const BottomNavBarItemProps = {
	name: {
		type: String,
	},
	icon: {
		type: String,
		default: '',
	},
	iconSize: {
		type: String,
		default: '20px',
	},
	classPrefix: {
		type: String,
		default: 'nice2cu-icon',
	},
	badge: {
		type: [Boolean, Number] as PropType<boolean | number>,
		default: false,
	},
	badgeColor: {
		type: String,
		default: '#ee0a24',
	},
	to: {
		type: String,
	},
} as const;

export type BottomNavBarItemPropsType = ExtractPropTypes<typeof BottomNavBarItemProps>;

export type BottomNavBarItemPropsProvide = {
	active: ComputedRef<string | number | undefined>;
	activeColor: ComputedRef<string | undefined>;
	defaultColor: ComputedRef<string | undefined>;
	bottomNavBarItemProxys: Ref<ComponentInternalInstance['proxy'][]>;
	changeNavBar: (indexOrName: number | string, comp: ComponentInternalInstance) => void;
};
