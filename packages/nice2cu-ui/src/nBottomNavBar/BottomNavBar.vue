<template>
	<div v-if="placeholder" :class="[bem.b('placeholder')]" :style="{ height: `${placeholderHeight}px` }"></div>
	<div
		ref="bottomNavbar"
		:class="[bem.b(), fixedBottom ? bem.m('fixed-bottom') : '', safeAreaInsetBottom ? bem.m('safe-bottom') : '', scroll ? bem.m('scroll') : '']"
		:style="{
			background: background,
			boxShadow: shadowTop ? `0px -2px 4px 0px ${shadowColor}` : '',
		}"
	>
		<slot />
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	computed,
	ComputedRef,
	ref,
	Ref,
	useSlots,
	VNode,
	SetupContext,
	provide,
	watch,
	ComponentInternalInstance,
	getCurrentInstance,
	onMounted,
	nextTick,
} from 'vue';
import { createNamespace } from '../../utils/create';
import { isNumber } from '../../utils/tools';
import { BottomNavBarProps, BottomNavBarPropsType } from './BottomNavBarProps';
import { BottomNavBarItemPropsProvide } from '../nBottomNavBarItem/BottomNavBarItemProps';
import './style/buttonNavBar.less';

export default defineComponent({
	name: 'NBottomNavbar',
	props: BottomNavBarProps,
	emits: ['update:active', 'switch'],
	setup(props: BottomNavBarPropsType, context: SetupContext) {
		const bem = createNamespace('bottom-navbar');
		const slots = useSlots();

		const active: ComputedRef<number | string | undefined> = computed(() => props.active);
		const scroll: ComputedRef<boolean> = computed(() => props.scroll);
		const activeColor: ComputedRef<string | undefined> = computed(() => props.activeColor);
		const defaultColor: ComputedRef<string | undefined> = computed(() => props.defaultColor);
		const bottomNavBarItems: ComputedRef<VNode[]> = computed(() => {
			const items: VNode[] = [];
			if (slots && slots.default) {
				slots.default().forEach((node: VNode) => {
					items.push(node);
				});
			}
			return items;
		});
		const { proxy } = getCurrentInstance() as ComponentInternalInstance;
		const bottomNavBarItemProxys: Ref<ComponentInternalInstance['proxy'][]> = ref([]);
		const placeholderHeight = ref();

		const checkBoundary = () => {
			if (bottomNavBarItems.value.length === 0 || !matchName() || !matchIndex()) {
				return;
			}
			activeHandler();
		};

		const matchName = () => bottomNavBarItems.value.find((node) => active.value === (node.props && node.props.name));

		const matchIndex = () => bottomNavBarItems.value.find((_node, index) => active.value === index);

		const activeHandler = () => {
			if (!isNumber(active.value)) {
				return;
			}

			if (active.value < 0) {
				context.emit('update:active', 0);
			} else if (active.value > bottomNavBarItems.value.length - 1) {
				context.emit('update:active', bottomNavBarItems.value.length - 1);
			}
		};

		const scrollHandler = (comp: ComponentInternalInstance) => {
			if (props.scroll) {
				const bottomNavbarDom = proxy?.$refs.bottomNavbar as HTMLElement;
				const bottomNavbarDomRect: DOMRect = bottomNavbarDom.getBoundingClientRect();
				const itemDom: HTMLElement = comp.refs ? comp.refs.bottomNavbarItem : (comp as any).$refs.bottomNavbarItem;
				const itemDomRect: DOMRect = itemDom.getBoundingClientRect();

				const scrollLeft: number =
					bottomNavbarDom.scrollLeft + itemDomRect.left - bottomNavbarDomRect.left - (bottomNavbarDomRect.width - itemDomRect.width) / 2;
				bottomNavbarDom.scrollLeft = scrollLeft;
			}
		};

		const changeNavBar = (indexOrName: number | string, comp: ComponentInternalInstance) => {
			scrollHandler(comp);

			context.emit('update:active', indexOrName);
			context.emit('switch', indexOrName, comp);
		};

		provide<BottomNavBarItemPropsProvide>('bottomNavBarItemProvide', {
			active,
			activeColor,
			defaultColor,
			scroll,
			bottomNavBarItemProxys,
			changeNavBar,
		});

		watch(
			bottomNavBarItems,
			() => {
				checkBoundary();
			},
			{ immediate: true }
		);

		onMounted(() => {
			nextTick(() => {
				const bottomNavbarDom = proxy?.$refs.bottomNavbar as HTMLElement;

				if (props.fixedBottom && props.placeholder) {
					placeholderHeight.value = bottomNavbarDom.getBoundingClientRect().height;
				}

				if (scroll.value) {
					const itemList = bottomNavBarItemProxys.value;
					itemList.forEach((item: any, index) => {
						if (active.value === index || active.value === item.name) {
							scrollHandler(item as any);
						}
					});
				}
			});
		});

		return { bem, placeholderHeight };
	},
});
</script>
