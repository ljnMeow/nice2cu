import { defineComponent, VNode, ref, computed, ComputedRef, watch, nextTick, CSSProperties, reactive } from 'vue';
import { createNamespace } from '../../utils/create';
import { isNumber, filterFragment, waitingScreenRedrawn } from '../../utils/tools';
import { TabsProps, TabsPropsType } from './TabsProps';
import { TabItemPropsType } from '../nTabItem/TabItemProps';
import nIcon from '../nIcon';
import nBadge from '../nBadge';
import nSwiper from '../nSwiper';
import nSwiperItem from '../nSwiperItem';
import './style/tab.less';

export default defineComponent({
	name: 'NTabs',
	components: {
		nIcon,
		nBadge,
		nSwiper,
		nSwiperItem,
	},
	props: TabsProps,
	emits: ['update:active', 'switch'],
	setup(props: TabsPropsType, { slots, emit }) {
		const bem = createNamespace('tabs');
		const active: ComputedRef<number | string | undefined> = computed(() => props.active);
		const childrenList: ComputedRef<VNode[]> = computed(() => filterFragment(slots && slots.default ? slots.default() : []));
		const navDom = ref<HTMLElement | null>(null);
		const navItem = ref<HTMLElement | null>(null);
		const lineStyle: CSSProperties = reactive({});
		const navDomHeight = ref<number>(0);

		const scrollWrapper = ref<HTMLElement>();
		const contentWidth = ref<number>(0);
		const scrollWrapperWidth = ref<number>(0);
		const translate = ref<number>(0);
		let startX: number;
		let startY: number;
		let startTime: number;
		let isTouching = false;
		let prevX: number | undefined;
		let prevY: number | undefined;
		let lockDuration = false;

		const checkBoundary = () => {
			if (childrenList.value.length === 0 || !matchName() || !matchIndex()) {
				return;
			}
			activeHandler();
		};

		const matchName = () => childrenList.value.find((node) => active.value === (node.props && node.props.name));

		const matchIndex = () => childrenList.value.find((_node, index) => active.value === index);

		const getPlaneIndex = (status?: number) => {
			const wrapperIndex = childrenList.value.findIndex(
				(child: VNode, index: number) => child.props!.name === active.value || index === active.value
			);
			if (status === 1) {
				return wrapperIndex + 1;
			} else if (status === -1) {
				return wrapperIndex - 1;
			} else {
				return isTouching ? Math.floor((translate.value - contentWidth.value / 2) / -contentWidth.value) : wrapperIndex;
			}
		};

		const initWrapper = async () => {
			await waitingScreenRedrawn();

			navDomHeight.value = navDom.value ? navDom.value.offsetHeight : 0;

			const navDomRect = navDom.value?.getBoundingClientRect();
			contentWidth.value = navDomRect ? navDomRect.width : 0;
			scrollWrapperWidth.value = navDomRect ? contentWidth.value * childrenList.value.length : 0;

			const index = getPlaneIndex();
			translate.value = index * -contentWidth.value;
		};

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
			setPlaneTranslate();
		};

		const toggleHandler = (value: string | number, title: string, childProps: TabItemPropsType | null) => {
			const disabled = childProps!.disabled || (childProps!.disabled as unknown as string) === '' ? true : false;
			if (active.value === value || disabled) return;
			changeTabs(value, title);
		};

		const setLineStyle = () => {
			nextTick(() => {
				const activeItem = navItem.value && (navItem.value.children.namedItem('n-tabs-nav-item--active') as HTMLElement);
				if (props.vertical) {
					if (activeItem?.className.includes('n-tabs-nav-item--disabled')) {
						lineStyle.top = `-100%`;
					} else {
						lineStyle.top = `${activeItem?.offsetTop}px`;
					}
				} else {
					if (activeItem?.className.includes('n-tabs-nav-item--disabled')) {
						lineStyle.left = `-100%`;
					} else {
						lineStyle.left = `${activeItem?.offsetLeft}px`;
					}
				}
				lineStyle[props.vertical ? 'right' : 'bottom'] = 0;
				lineStyle.width = props.vertical ? '3px' : `${activeItem?.offsetWidth}px`;
				lineStyle.height = props.vertical ? `${activeItem?.offsetHeight}px` : '3px';
			});
		};

		const setPlaneTranslate = () => {
			nextTick(() => {
				const index = getPlaneIndex();
				translate.value = props.vertical ? index * -props.wrapperHeight : index * -contentWidth.value;
			});
		};

		const scrollHandler = () => {
			nextTick(() => {
				if (!props.scroll) return;
				const scrollDom = navItem.value;
				const scrollDomRect = scrollDom && scrollDom.getBoundingClientRect();
				const activeItem = navItem.value && (navItem.value.children.namedItem('n-tabs-nav-item--active') as HTMLElement);
				const activeItemRect = activeItem && activeItem.getBoundingClientRect();

				if (!scrollDom || !activeItem || !scrollDomRect || !activeItemRect) return;

				const scrollLeft: number = scrollDom.scrollLeft + activeItemRect.left - scrollDomRect.left - (scrollDomRect.width - activeItemRect.width) / 2;
				const scrollTop: number = scrollDom.scrollTop + activeItemRect.top - scrollDomRect.top - (scrollDomRect.height - activeItemRect.height) / 2;
				scrollDom[props.vertical ? 'scrollTop' : 'scrollLeft'] = props.vertical ? scrollTop : scrollLeft;
			});
		};

		const checkPositionBoundAndFix = (fn?: () => void) => {
			const outweighLeft = translate.value >= contentWidth.value;
			const outweighRight = translate.value <= -scrollWrapperWidth.value;
			const leftTranslate = 0;
			const rightTranslate = -(scrollWrapperWidth.value - contentWidth.value);

			lockDuration = true;

			if (outweighLeft || outweighRight) {
				lockDuration = true;
				translate.value = outweighRight ? leftTranslate : rightTranslate;

				const firstSwiperItem = scrollWrapper.value?.children[0];
				const lastSwiperItem = scrollWrapper.value?.children[scrollWrapper.value?.children.length - 1];
				(firstSwiperItem as any)!.style.transform = 'translateX(0px)';
				(lastSwiperItem as any)!.style.transform = 'translateX(0px)';
			}

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					lockDuration = false;
					fn && fn();
				});
			});
		};

		const handlerTouchStart = (event: TouchEvent) => {
			if (childrenList.value.length <= 1 || !props.touchable) return;

			const { clientX, clientY } = event.touches[0];
			startX = clientX;
			startY = clientY;
			startTime = performance.now();
			isTouching = true;

			checkPositionBoundAndFix(() => {
				lockDuration = true;
			});
		};

		const handlerTouchMove = (event: TouchEvent) => {
			if (!props.touchable || !isTouching) return;

			const { clientX, clientY } = event.touches[0];

			event.preventDefault();

			const moveX = prevX ? clientX - prevX : 0;
			const moveY = prevY ? clientY - prevY : 0;
			prevX = clientX;
			prevY = clientY;

			translate.value += props.vertical ? moveY : moveX;
		};

		const handlerTouchEnd = () => {
			if (!isTouching) return;

			const positive = props.vertical ? (prevY as number) < startY : (prevX as number) < startX;
			const distance = props.vertical ? Math.abs(startY - (prevY as number)) : Math.abs(startX - (prevX as number));
			const quickSwiping = performance.now() - startTime <= 250 && distance >= 20;
			let swiperIndex = quickSwiping ? (positive ? getPlaneIndex(1) : getPlaneIndex(-1)) : getPlaneIndex();

			if (swiperIndex <= 0) {
				swiperIndex = 0;
			}
			if (swiperIndex >= childrenList.value.length - 1) {
				swiperIndex = childrenList.value.length - 1;
			}

			isTouching = false;
			prevX = undefined;
			prevY = undefined;

			lockDuration = false;
			translate.value = props.vertical ? swiperIndex * -props.wrapperHeight : swiperIndex * -contentWidth.value;

			const currentSwiper = childrenList.value[swiperIndex];
			toggleHandler(currentSwiper.props!.name || swiperIndex, currentSwiper.props!.title, currentSwiper.props as TabItemPropsType);
		};

		watch(
			() => active.value,
			async () => {
				await initWrapper();
				checkBoundary();
				setLineStyle();
				scrollHandler();
				setPlaneTranslate();
			}
		);

		watch(
			childrenList,
			async () => {
				await initWrapper();
				checkBoundary();
				setLineStyle();
				scrollHandler();
				setPlaneTranslate();
			},
			{ immediate: true }
		);

		window.addEventListener(
			'resize',
			async () => {
				await initWrapper();
				checkBoundary();
				setLineStyle();
				scrollHandler();
				setPlaneTranslate();
			},
			true
		);

		return () => {
			const width = contentWidth.value;

			return (
				<div ref={navDom} class={[bem.b(), props.vertical ? bem.m('vertical') : '']}>
					<div
						ref={navItem}
						class={[
							bem.b('nav'),
							props.scroll ? bem.bm('nav', 'scroll') : '',
							props.lineAnimated ? bem.bm('nav', 'animated') : '',
							props.vertical ? bem.bm('nav', 'vertical') : '',
						]}
						style={{
							background: props.background,
							boxShadow: props.shadowBottom ? `0px 2px 4px 0px ${props.shadowColor}` : '',
							flex: `0 0 ${props.vertical ? props.leftWidth : 'auto'}`,
							height: props.vertical ? `${navDomHeight.value}px` : 'auto',
						}}
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
							style={{
								...lineStyle,
								background: props.activeColor,
							}}
						></div>
					</div>
					<div
						ref={scrollWrapper}
						class={[bem.be('scroll', 'wrapper'), props.vertical ? bem.bem('scroll', 'wrapper', 'vertical') : '']}
						style={{
							width: !props.vertical ? `${scrollWrapperWidth.value}px` : `calc(100% - ${props.leftWidth})`,
							height: props.vertical ? `${props.wrapperHeight}px` : 'auto',
							transform: `translate${props.vertical ? 'Y' : 'X'}(${translate.value}px)`,
							transitionDuration: `${lockDuration ? '0ms' : props.wrapperAnimated ? '300ms' : '0ms'}`,
						}}
						onTouchstart={handlerTouchStart}
						onTouchmove={handlerTouchMove}
						onTouchend={handlerTouchEnd}
					>
						{childrenList.value.map((child: VNode, index: number) => {
							const isActive = active.value === index || active.value === child.props!.name;
							const disabled = child.props!.disabled || child.props!.disabled === '' ? true : false;

							return (
								<div
									class={[bem.be('wrapper', 'item'), isActive && !disabled ? bem.em('item', 'active') : '']}
									style={{ width: props.vertical ? '100%' : `${width}px`, height: `${props.wrapperHeight}px` }}
								>
									{!disabled ? child : ''}
								</div>
							);
						})}
					</div>
				</div>
			);
		};
	},
});
