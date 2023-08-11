<template>
	<div :class="[bem.b()]" :style="{ width: `${width}px`, transform: `translateX(${translate}px)` }">
		<slot />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, ref } from 'vue';
import { createNamespace } from '../../utils/create';
import { SwiperItemProvidType } from '../nSwiper/SwiperProps';
import './style/swiperItem.less';

export default defineComponent({
	name: 'NSwiperItem',
	setup() {
		const bem = createNamespace('swiper-item');

		const swiperItemProvid: SwiperItemProvidType | undefined = inject('swiperItemProvid');

		const width = computed(() => swiperItemProvid?.width.value);

		const translate: Ref<number> = ref(0);

		const setTranslate = (num: number) => {
			translate.value = num;
		};

		return { bem, width, translate, setTranslate };
	},
});
</script>
