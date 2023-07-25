<template>
	<div ref="stickyRoot" :class="[bem.b()]" :style="rootStyle">
		<div ref="stickyBox" :class="[bem.m('container')]" :style="stickyStyle">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, CSSProperties, onMounted, onUnmounted } from 'vue';
import { createNamespace } from '../../utils/create';
import { getScrollParent, toNumber } from '../../utils/tools';
import { StickyProps, StickyPropsType } from './StickyProps';
import './style/sticky.less';

export default defineComponent({
	name: 'NSticky',
	props: StickyProps,
	setup(props: StickyPropsType) {
		const bem = createNamespace('sticky');

		const stickyRoot = ref<HTMLElement | null>(null);
		const stickyBox = ref<HTMLElement | null>(null);

		const isFixed = ref<boolean>(false);
		const fixedTop = ref<string>('0px');
		const fixedLeft = ref<string>('0px');
		const fixedWidth = ref<string>('auto');
		const fixedHeight = ref<string>('auto');
		const fixedWrapperWidth = ref<string>('auto');
		const fixedWrapperHeight = ref<string>('auto');

		const threshold = computed(() => {
			return props.position === 'top' ? toNumber(props.top) : toNumber(props.bottom);
		});

		const rootStyle = computed<CSSProperties>(() => {
			if (isFixed.value) return { width: fixedWidth.value, height: fixedHeight.value, zIndex: toNumber(props.zIndex) };
			return {};
		});
		const stickyStyle = computed<CSSProperties>(() => {
			if (!isFixed.value) return {};
			return {
				position: 'fixed',
				width: fixedWrapperWidth.value,
				height: fixedWrapperHeight.value,
				left: fixedLeft.value,
				top: fixedTop.value,
				zIndex: toNumber(props.zIndex),
			};
		});

		let scroller: HTMLElement | Window;

		const paramsHandler = () => {
			let scrollerTop = 0,
				scrollerBottom = 0;

			if (scroller !== window) {
				const { top, bottom } = (scroller as HTMLElement).getBoundingClientRect();
				scrollerTop = top;
				scrollerBottom = bottom;
			} else {
				scrollerBottom = window.innerHeight;
			}

			const root = stickyRoot.value as HTMLElement;
			const sticky = stickyBox.value as HTMLElement;
			const { top: stickyTop, left: stickyLeft, bottom: stickyBottom } = root.getBoundingClientRect();
			const currentOffsetTop = stickyTop - scrollerTop;

			fixedLeft.value = `${stickyLeft}px`;
			fixedWidth.value = `${sticky.offsetWidth}px`;
			fixedHeight.value = `${sticky.offsetHeight}px`;
			fixedWrapperWidth.value = `${sticky.offsetWidth}px`;
			fixedWrapperHeight.value = `${sticky.offsetHeight}px`;

			if (currentOffsetTop <= threshold.value && props.position === 'top') {
				fixedTop.value = `${scrollerTop + threshold.value}px`;
				isFixed.value = true;
			} else if (scrollerBottom - threshold.value < stickyBottom && props.position === 'bottom') {
				fixedTop.value = `${scrollerBottom - threshold.value - sticky.offsetHeight}px`;
				isFixed.value = true;
			} else {
				isFixed.value = false;
			}
		};

		const scrollHandler = () => {
			if (!scroller) return;

			paramsHandler();
		};

		onMounted(() => {
			scroller = getScrollParent(stickyRoot.value as HTMLElement);
			scroller !== window && scroller.addEventListener('scroll', scrollHandler);
			scrollHandler();
		});

		onUnmounted(() => {
			scroller !== window && scroller.removeEventListener('scroll', scrollHandler);
		});

		window.addEventListener('scroll', scrollHandler, true);

		return { bem, stickyRoot, stickyBox, rootStyle, stickyStyle };
	},
});
</script>
