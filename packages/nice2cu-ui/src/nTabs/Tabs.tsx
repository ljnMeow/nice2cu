import { defineComponent, VNode, ref, computed, ComputedRef, watch, nextTick, CSSProperties, reactive, provide } from 'vue';
import { createNamespace } from '../../utils/create';
import { isNumber, filterFragment } from '../../utils/tools';
import { TabsProps, TabsPropsType } from './TabsProps';
import { TabItemPropsType, TabItemProvide } from '../nTabItem/TabItemProps';
import nIcon from '../nIcon';
import nBadge from '../nBadge';
import './style/tab.less';

export default defineComponent({
	name: 'NTabs',
	components: {
		nIcon,
		nBadge,
	},
	props: TabsProps,
	emits: ['update:active', 'switch'],
	setup(props: TabsPropsType, { slots, emit }) {
		const bem = createNamespace('tabs');
		const active: ComputedRef<number | string | undefined> = computed(() => props.active);
		const childrenList: ComputedRef<VNode[]> = computed(() => filterFragment(slots && slots.default ? slots.default() : []));
		const navItem = ref<HTMLElement | null>(null);
		const lineStyle: CSSProperties = reactive({});
		const navContent = ref<HTMLElement | null>(null);

		const checkBoundary = () => {
			if (childrenList.value.length === 0 || !matchName() || !matchIndex()) {
				return;
			}
			activeHandler();
		};

		const matchName = () => childrenList.value.find((node) => active.value === (node.props && node.props.name));

		const matchIndex = () => childrenList.value.find((_node, index) => active.value === index);

		const activeHandler = () => {
			if (!isNumber(active.value)) {
				return;
			}

			if (active.value < 0) {
				emit('update:active', 0);
			} else if (active.value > childrenList.value.length - 1) {
				emit('update:active', childrenList.value.length - 1);
			}
		};

		const changeTabs = (value: string | number, title: string) => {
			emit('update:active', value);
			emit('switch', value, title);
			scrollHandler();
			setLineStyle();
		};

		const toggleHandler = (value: string | number, title: string, childProps: TabItemPropsType | null) => {
			const disabled = childProps!.disabled || (childProps!.disabled as unknown as string) === '' ? true : false;
			if (active.value === value || disabled) return;
			changeTabs(value, title);
		};

		const setLineStyle = () => {
			nextTick(() => {
				const activeItem = navItem.value && (navItem.value.children.namedItem('n-tabs-nav-item--active') as HTMLElement);
				if (activeItem?.className.includes('n-tabs-nav-item--disabled')) {
					lineStyle.left = `-100%`;
				} else {
					lineStyle.left = `${activeItem?.offsetLeft}px`;
				}
				lineStyle.width = `${activeItem?.offsetWidth}px`;
			});
		};

		const scrollHandler = () => {
			nextTick(() => {
				const scrollDom = navItem.value;
				const scrollDomRect = scrollDom && scrollDom.getBoundingClientRect();
				const activeItem = navItem.value && (navItem.value.children.namedItem('n-tabs-nav-item--active') as HTMLElement);
				const activeItemRect = activeItem && activeItem.getBoundingClientRect();

				if (!scrollDom || !activeItem || !scrollDomRect || !activeItemRect) return;

				const scrollLeft: number = scrollDom.scrollLeft + activeItemRect.left - scrollDomRect.left - (scrollDomRect.width - activeItemRect.width) / 2;
				scrollDom.scrollLeft = scrollLeft;

				const navContentScrollDom = navContent.value;
				const activeWrapper = navContent.value && (navContent.value.children.namedItem('n-tabs-nav-wrapper--active') as HTMLElement);
				const activeWrapperRect = activeWrapper && activeWrapper.getBoundingClientRect();

				if (!navContentScrollDom || !activeWrapper || !activeWrapperRect) return;

				const wrapperIndex = childrenList.value.findIndex(
					(child: VNode, index: number) => child.props!.name === active.value || index === active.value
				);

				navContentScrollDom.scrollLeft = activeWrapperRect.width * wrapperIndex;
			});
		};

		watch(
			childrenList,
			() => {
				checkBoundary();
				setLineStyle();
				scrollHandler();
			},
			{ immediate: true }
		);

		provide<TabItemProvide>('TabsItemProvide', {
			active,
			childrenList,
		});

		window.addEventListener(
			'resize',
			() => {
				checkBoundary();
				setLineStyle();
				scrollHandler();
			},
			true
		);

		return () => {
			return (
				<div class={[bem.b()]}>
					<div
						ref={navItem}
						class={[bem.b('nav'), props.scroll ? bem.bm('nav', 'scroll') : '', props.lineAnimated ? bem.bm('nav', 'animated') : '']}
						style={{ background: props.background, boxShadow: props.shadowBottom ? `0px 2px 4px 0px ${props.shadowColor}` : '' }}
					>
						{childrenList.value.map((child: VNode, index: number) => {
							if ((child.type as any).name !== 'NTabItem') return;
							const defaultProps = (child.type as VNode).props;
							const title = child.props!.title ? child.props!.title : defaultProps!.title.default;
							const name = child.props!.name ? child.props!.name : defaultProps!.name.default;
							const isActive = active.value === index || active.value === child.props!.name;
							const itemIcon = child.props!.icon ? child.props!.icon : defaultProps!.icon.default;
							const classPrefix = child.props!.classPrefix ? child.props!.classPrefix : defaultProps!.classPrefix.default;
							const iconSize = child.props!.iconSize ? child.props!.iconSize : defaultProps!.iconSize.default;
							const disabled = child.props!.disabled || child.props!.disabled === '' ? true : false;
							const dot = child.props!.dot || child.props!.dot === '' ? true : false;
							const badge = child.props!.badge ? child.props!.badge : defaultProps!.badge.default;
							const isHidden = !dot && !badge;
							const badgeColor =
								child.props!.badgeColor || child.props!['badge-color']
									? child.props!.badgeColor || child.props!['badge-color']
									: defaultProps!.badgeColor.default;

							return (
								<div
									class={[
										bem.b('nav-item'),
										isActive && !disabled ? bem.bm('nav-item', 'active') : '',
										disabled ? bem.bm('nav-item', 'disabled') : '',
									]}
									id={isActive ? bem.bm('nav-item', 'active') : ''}
									style={{
										color: isActive && !disabled ? props.activeColor : props.defaultColor,
									}}
									onClick={() => toggleHandler(name ?? index, title, child.props as TabItemPropsType)}
								>
									<n-badge class={bem.be('nav-item', 'badge')} dot={dot} content={badge} hidden={isHidden} color={badgeColor} position="right-top">
										<n-icon class={bem.e('nav-item-icon')} v-show={itemIcon} icon={itemIcon} classPrefix={classPrefix} size={iconSize}></n-icon>
										<div class={[bem.e('nav-item-text')]}>{title}</div>
									</n-badge>
								</div>
							);
						})}
						<div
							class={[bem.be('nav', 'line'), props.lineAnimated ? bem.bem('nav', 'line', 'animated') : '']}
							style={{ width: lineStyle.width, background: props.activeColor, left: lineStyle.left, display: lineStyle.display }}
						></div>
					</div>
					<div ref={navContent} class={[bem.b('content'), props.wrapperAnimated ? bem.bm('content', 'animated') : '']}>
						{childrenList.value.map((child: VNode, index: number) => {
							const isActive = active.value === index || active.value === child.props!.name;

							return (
								<div class={[bem.be('item', 'wrapper')]} id={isActive ? bem.bm('nav-wrapper', 'active') : ''}>
									{child}
								</div>
							);
						})}
					</div>
				</div>
			);
		};
	},
});
