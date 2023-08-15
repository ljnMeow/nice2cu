import {
	defineComponent,
	Ref,
	ref,
	ComputedRef,
	computed,
	VNode,
	watch,
	reactive,
	toRef,
	provide,
	Fragment,
	onDeactivated,
	onBeforeUnmount,
} from 'vue';
import { createNamespace } from '../../utils/create';
import { isNumber, toNumber, filterFragment, waitingScreenRedrawn } from '../../utils/tools';
import { useExpose } from '../../utils/useExpose';
import { SwiperProps, SwiperPropsType, SwiperState, SwiperItemProvidType, SwiperExporeType } from './SwiperProps';
import nIcon from '../nIcon';
import './style/swiper.less';

export default defineComponent({
	name: 'NSwiper',
	components: { nIcon },
	props: SwiperProps,
	emits: ['update:active'],
	setup(props: SwiperPropsType, { slots, emit }) {
		const bem = createNamespace('swiper');

		const swiper: Ref<HTMLElement | null> = ref(null);
		const childrenList: ComputedRef<VNode[]> = computed(() =>
			slots && slots.default ? filterFragment(slots.default()).filter((child: VNode) => (child.type as any).name === 'NSwiperItem') : []
		);
		const length: Ref<number> = ref(childrenList.value.length);

		const state: SwiperState = reactive({
			wrapperWidth: 0,
			wrapperHeight: 0,
			width: 0,
			height: 0,
			active: 0,
			translate: 0,
			lockDuration: false,
		});

		let isUpdate = false;
		let isInitIndex = false;
		let timer: number | null = null;
		let startX: number;
		let startY: number;
		let startTime: number;
		let isTouching = false;
		let prevX: number | undefined;
		let prevY: number | undefined;

		const boundIndex = (index: number) => {
			if (props.loop) {
				if (index < 0) {
					return length.value + index;
				}
				if (index >= length.value) {
					return index - length.value;
				}
				return index;
			}
			return Math.min(length.value - 1, Math.max(0, index));
		};

		const checkLoopPositionBound = () => {
			if (!props.loop) return;

			if (state.translate >= 0) {
				const lastSwiperItem = childrenList.value[length.value - 1];
				(lastSwiperItem.component!.proxy! as any).setTranslate(props.vertical ? -state.wrapperHeight : -state.wrapperWidth);
			}
			if (state.translate <= (props.vertical ? -(state.wrapperHeight - state.height) : -(state.wrapperWidth - state.width))) {
				const firstSwiperItem = childrenList.value[0];
				(firstSwiperItem.component!.proxy! as any).setTranslate(props.vertical ? state.wrapperHeight : state.wrapperWidth);
			}
			if (state.translate > (props.vertical ? -(state.wrapperHeight - state.height) : -(state.wrapperWidth - state.width)) && state.translate < 0) {
				const firstSwiperItem = childrenList.value[0];
				const lastSwiperItem = childrenList.value[length.value - 1];
				(firstSwiperItem.component!.proxy! as any).setTranslate(0);
				(lastSwiperItem.component!.proxy! as any).setTranslate(0);
			}
		};

		const checkPositionBoundAndFix = (fn?: () => void) => {
			const outweighLeft = props.vertical ? state.translate >= state.height : state.translate >= state.height;
			const outweighRight = props.vertical ? state.translate <= -state.wrapperHeight : state.translate <= -state.wrapperWidth;
			const leftTranslate = 0;
			const rightTranslate = props.vertical ? -(state.wrapperHeight - state.height) : -(state.wrapperWidth - state.width);

			state.lockDuration = true;

			if (outweighLeft || outweighRight) {
				state.lockDuration = true;
				state.translate = outweighRight ? leftTranslate : rightTranslate;

				const firstSwiperItem = childrenList.value[0];
				const lastSwiperItem = childrenList.value[length.value - 1];
				(firstSwiperItem.component!.proxy! as any).setTranslate(0);
				(lastSwiperItem.component!.proxy! as any).setTranslate(0);
			}

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					state.lockDuration = false;
					fn && fn();
				});
			});
		};

		const getSwiperIndex = (targetSwiperIndex?: number) => {
			const swiperIndex = isNumber(targetSwiperIndex)
				? targetSwiperIndex
				: props.vertical
				? Math.floor((state.translate - state.height / 2) / -state.height)
				: Math.floor((state.translate - state.width / 2) / -state.width);

			if (swiperIndex <= -1) {
				return props.loop ? -1 : 0;
			}
			if (swiperIndex >= length.value) {
				return props.loop ? length.value : length.value - 1;
			}

			return swiperIndex;
		};

		const swiperIndexToIndex = (swiperIndex: number) => {
			const { loop } = props;

			if (swiperIndex === -1) {
				return loop ? length.value - 1 : 0;
			}
			if (swiperIndex === length.value) {
				return loop ? 0 : length.value - 1;
			}

			return swiperIndex;
		};

		const init = () => {
			length.value = childrenList.value.length;
			const swiperRect: DOMRect | undefined = swiper.value?.getBoundingClientRect();
			state.width = swiperRect ? swiperRect.width : 0;
			state.height = swiperRect ? swiperRect.height : 0;
			state.wrapperWidth = state.width * length.value;
			state.wrapperHeight = state.height * length.value;

			childrenList.value.forEach((swiperItem: VNode) => {
				(swiperItem.component?.proxy as any).setTranslate(0);
			});

			state.lockDuration = true;
			state.translate = props.vertical ? state.active * -state.height : state.active * -state.width;

			stopAutoPlay();
			setTimeout(() => {
				startAutoPlay();
			}, 500);

			setTimeout(() => {
				state.lockDuration = false;
			});
		};

		const handlerInitIndex = () => {
			if (isInitIndex) return;

			state.active = boundIndex(toNumber(props.active));

			isInitIndex = true;
		};

		const startAutoPlay = () => {
			if (!props.autoPlay || length.value <= 1) return;

			stopAutoPlay();

			timer = window.setTimeout(() => {
				next();
				startAutoPlay();
			}, toNumber(props.autoPlay));
		};

		const stopAutoPlay = () => timer && clearTimeout(timer);

		const next = () => {
			if (length.value <= 1) return;

			handlerInitIndex();

			const currentIndex = state.active;
			state.active = boundIndex(currentIndex + 1);

			checkPositionBoundAndFix(() => {
				if (currentIndex === length.value - 1 && props.loop) {
					const firstSwiperItem = childrenList.value[0];
					(firstSwiperItem.component!.proxy! as any).setTranslate(props.vertical ? state.wrapperHeight : state.wrapperWidth);

					state.translate = props.vertical ? length.value * -state.height : length.value * -state.width;
					return;
				}
				if (currentIndex !== length.value - 1) {
					state.translate = props.vertical ? state.active * -state.height : state.active * -state.width;
				}
			});

			stopAutoPlay();
			setTimeout(() => {
				startAutoPlay();
			}, 500);
		};

		const prev = () => {
			if (length.value <= 1) return;

			handlerInitIndex();

			const currentIndex = state.active;
			state.active = boundIndex(currentIndex - 1);

			checkPositionBoundAndFix(() => {
				if (currentIndex === 0 && props.loop) {
					const lastSwiperItem = childrenList.value[length.value - 1];
					(lastSwiperItem.component!.proxy! as any).setTranslate(props.vertical ? -state.wrapperHeight : -state.wrapperWidth);

					state.translate = props.vertical ? state.height : state.width;
					return;
				}
				if (currentIndex !== 0) {
					state.translate = props.vertical ? state.active * -state.height : state.active * -state.width;
				}
			});

			stopAutoPlay();
			setTimeout(() => {
				startAutoPlay();
			}, 500);
		};

		const jump = (idx: number) => {
			if (length.value === 1 || idx === state.active) return;

			idx = idx < 0 ? 0 : idx;
			idx = idx >= length.value ? length.value : idx;

			const task = idx > state.active ? next : prev;
			const count = Math.abs(idx - state.active);

			Array.from({ length: count }).forEach(() => {
				task();
			});

			stopAutoPlay();
			setTimeout(() => {
				startAutoPlay();
			}, 500);
		};

		const renderDots = () => {
			return (
				<div class={[bem.e('dots'), props.vertical ? bem.em('dots', 'vertical') : '']}>
					{childrenList.value.map((_child, index: number) => {
						return (
							<div
								onClick={() => jump(index)}
								class={[bem.e('dot'), props.vertical ? bem.em('dot', 'vertical') : '', state.active === index ? bem.em('dot', 'active') : '']}
								style={{ backgroundColor: props.dotColor }}
							></div>
						);
					})}
				</div>
			);
		};

		const renderDirector = () => {
			return (
				<Fragment>
					<div onClick={() => prev()} class={[bem.b('director'), bem.be('director', props.vertical ? 'top' : 'left')]}>
						<n-icon icon={props.directorType === 'static' ? 'n-left' : 'n-arrow-back'} color={props.directorColor} size="20px" />
					</div>
					<div onClick={() => next()} class={[bem.b('director'), bem.be('director', props.vertical ? 'bottom' : 'right')]}>
						<n-icon icon={props.directorType === 'static' ? 'n-right' : 'n-arrow-forward'} color={props.directorColor} size="20px" />
					</div>
				</Fragment>
			);
		};

		const handlerTouchStart = (event: TouchEvent) => {
			if (length.value <= 1 || !props.touchable) return;

			const { clientX, clientY } = event.touches[0];
			startX = clientX;
			startY = clientY;
			startTime = performance.now();
			isTouching = true;

			stopAutoPlay();

			checkPositionBoundAndFix(() => {
				state.lockDuration = true;
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

			state.translate += props.vertical ? moveY : moveX;

			checkLoopPositionBound();
		};

		const handlerTouchEnd = () => {
			if (!isTouching) return;

			const positive = props.vertical ? (prevY as number) < startY : (prevX as number) < startX;
			const distance = props.vertical ? Math.abs(startY - (prevY as number)) : Math.abs(startX - (prevX as number));
			const quickSwiping = performance.now() - startTime <= 250 && distance >= 20;
			const swiperIndex = quickSwiping ? (positive ? getSwiperIndex(state.active + 1) : getSwiperIndex(state.active - 1)) : getSwiperIndex();

			isTouching = false;
			state.lockDuration = false;
			prevX = undefined;
			prevY = undefined;

			state.translate = props.vertical ? swiperIndex * -state.height : swiperIndex * -state.width;

			state.active = swiperIndexToIndex(swiperIndex);

			isUpdate = true;

			startAutoPlay();
		};

		provide<SwiperItemProvidType>('swiperItemProvid', {
			width: toRef(state, 'width'),
			height: toRef(state, 'height'),
			vertical: props.vertical,
		});

		useExpose<SwiperExporeType>({
			prev,
			next,
			jump,
			init,
			state,
		});

		watch(
			() => childrenList.value,
			async () => {
				await waitingScreenRedrawn();
				handlerInitIndex();
				init();
			},
			{ immediate: true }
		);

		watch(
			() => props.active,
			() => {
				setTimeout(() => {
					if (isUpdate) {
						isUpdate = false;
						return;
					}
					jump(toNumber(props.active));
				}, 100);
			}
		);

		watch(
			() => state.active,
			() => {
				emit('update:active', state.active);
			}
		);

		onDeactivated(() => {
			stopAutoPlay();
		});

		onBeforeUnmount(() => {
			stopAutoPlay();
		});

		window.addEventListener('resize', () => init(), { passive: true });
		window.addEventListener('orientationchange', () => init(), { passive: true });

		return () => {
			const wrapperWidthRef = toRef(state, 'wrapperWidth');
			const wrapperHeightRef = toRef(state, 'wrapperHeight');

			return (
				<div ref={swiper} class={[bem.b()]}>
					<div
						class={[bem.e('wrapper'), props.vertical ? bem.em('wrapper', 'vertical') : '']}
						style={{
							width: !props.vertical ? `${wrapperWidthRef.value}px` : 'auto',
							height: props.vertical ? `${wrapperHeightRef.value}px` : 'auto',
							transform: `translate${props.vertical ? 'Y' : 'X'}(${state.translate}px)`,
							transitionDuration: state.lockDuration ? `0ms` : `${toNumber(props.duration)}ms`,
						}}
						onTouchstart={handlerTouchStart}
						onTouchmove={handlerTouchMove}
						onTouchend={handlerTouchEnd}
					>
						{childrenList.value.map((child: VNode) => {
							return child;
						})}
					</div>
					{slots.dots && props.hasdot ? slots.dots({ index: state.active, length: length.value }) : renderDots()}
					{props.hasDirector ? renderDirector() : false}
				</div>
			);
		};
	},
});
