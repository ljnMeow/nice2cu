import { defineComponent, Ref, ref, ComputedRef, computed, VNode, watch, reactive, toRef, provide } from 'vue';
import { createNamespace } from '../../utils/create';
import { toNumber, filterFragment, waitingScreenRedrawn } from '../../utils/tools';
import { SwiperProps, SwiperPropsType, SwiperItemProvidType } from './SwiperProps';
import nIcon from '../nIcon';
import './style/swiper.less';

export default defineComponent({
	name: 'NSwiper',
	components: { nIcon },
	props: SwiperProps,
	setup(props: SwiperPropsType, { slots }) {
		const bem = createNamespace('swiper');

		const swiper: Ref<HTMLElement | null> = ref(null);
		const childrenList: ComputedRef<VNode[]> = computed(() =>
			slots && slots.default ? filterFragment(slots.default()).filter((child: VNode) => (child.type as any).name === 'NSwiperItem') : []
		);
		const length: Ref<number> = ref(childrenList.value.length);

		const state = reactive({
			wrapperWidth: 0,
			width: 0,
			height: 0,
			active: 0,
			translate: 0,
			lockDuration: false,
		});

		let isInitIndex = false;
		let timer: number | null = null;

		provide<SwiperItemProvidType>('swiperItemProvid', {
			width: toRef(state, 'width'),
		});

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

		const checkPositionBoundAndFix = (fn?: () => void) => {
			const outweighLeft = state.translate >= state.width;
			const outweighRight = state.translate <= -state.wrapperWidth;
			const leftTranslate = 0;
			const rightTranslate = -(state.wrapperWidth - state.width);

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

		const init = () => {
			const swiperRect: DOMRect | undefined = swiper.value?.getBoundingClientRect();
			state.width = swiperRect ? swiperRect.width : 0;
			state.wrapperWidth = state.width * length.value;

			childrenList.value.forEach((swiperItem: VNode) => {
				(swiperItem.component?.proxy as any).setTranslate(0);
			});

			state.lockDuration = true;
			state.translate = state.active * -state.width;

			startAutoPlay();

			setTimeout(() => {
				state.lockDuration = false;
			});
		};

		const handlerInitIndex = () => {
			if (isInitIndex) return;

			state.active = boundIndex(toNumber(props.initIndex));

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
					(firstSwiperItem.component!.proxy! as any).setTranslate(state.wrapperWidth);

					state.translate = length.value * -state.width;
					return;
				}
				if (currentIndex !== length.value - 1) {
					state.translate = state.active * -state.width;
				}
			});
		};

		const prev = () => {
			if (length.value <= 1) return;

			handlerInitIndex();

			const currentIndex = state.active;
			state.active = boundIndex(currentIndex - 1);

			checkPositionBoundAndFix(() => {
				if (currentIndex === 0 && props.loop) {
					const lastSwiperItem = childrenList.value[length.value - 1];
					(lastSwiperItem.component!.proxy! as any).setTranslate(-state.wrapperWidth);

					state.translate = state.width;
					return;
				}
				if (currentIndex !== 0) {
					state.translate = state.active * -state.width;
				}
			});
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
				<div class={[bem.e('dots')]}>
					{childrenList.value.map((_child, index: number) => {
						return (
							<div
								onClick={() => jump(index)}
								class={[bem.e('dot'), state.active === index ? bem.em('dot', 'active') : '']}
								style={{ backgroundColor: props.dotColor }}
							></div>
						);
					})}
				</div>
			);
		};

		const renderDirector = () => {
			return (
				<div class={bem.e('director')}>
					<div onClick={() => prev()} class={bem.b('left')}>
						<n-icon icon={props.directorType === 'static' ? 'n-left' : 'n-arrow-back'} color={props.directorColor} size="20px" />
					</div>
					<div onClick={() => next()} class={bem.b('right')}>
						<n-icon icon={props.directorType === 'static' ? 'n-right' : 'n-arrow-forward'} color={props.directorColor} size="20px" />
					</div>
				</div>
			);
		};

		watch(
			() => childrenList.value,
			async () => {
				await waitingScreenRedrawn();
				handlerInitIndex();
				init();
			},
			{ immediate: true }
		);

		return () => {
			const wrapperWidthRef = toRef(state, 'wrapperWidth');

			return (
				<div ref={swiper} class={[bem.b()]}>
					<div
						class={[bem.e('wrapper')]}
						style={{
							width: `${wrapperWidthRef.value}px`,
							transform: `translateX(${state.translate}px)`,
							transitionDuration: state.lockDuration ? `0ms` : `${toNumber(props.duration)}ms`,
						}}
					>
						{childrenList.value.map((child: VNode) => {
							return child;
						})}
					</div>
					{slots.dots && props.hasdot ? slots.dots({ active: state.active, length: length.value }) : renderDots()}
					{props.hasDirector ? renderDirector() : false}
				</div>
			);
		};
	},
});
