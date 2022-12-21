<template>
	<div
		:class="[bem.b(), block ? bem.m('block') : '']"
		:style="{ width: handleUnit(width), height: handleUnit(height), borderRadius: handleUnit(radius) }"
	>
		<img
			v-if="lazy"
			v-lazy="{ src: src, loading: loading, error: error, onLoadImg: handleImgLoad, onErrorImg: handleImgError }"
			:class="bem.e('image')"
			:alt="alt"
			:title="title"
			:style="{ objectFit: fit }"
		/>
		<img v-else :class="bem.e('image')" :alt="alt" :title="title" :src="imgSrc" :style="{ objectFit: fit }" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createNamespace } from '../../utils/create';
import { handleUnit } from '../../utils/tools';
import Lazy from '../../directives/lazy';
import { LazyEventOptions } from '../../directives/lazy';
import { defaultLoadingImg, defaultLoadingError } from '../../directives/lazy/defaultImg';
import { ImageProps } from './ImageProps';
import './style/image.less';

export default defineComponent({
	name: 'NImage',
	directives: { Lazy },
	props: ImageProps,
	setup(props: ImageProps) {
		const bem = createNamespace('image');
		const imgSrc = ref(props.loading ?? defaultLoadingImg);

		const imageLoad = () => {
			const { lazy, src, error, onLoad, onError } = props;
			if (!lazy) {
				let image = new Image();
				image.src = src;
				image.onerror = (e: Event | string) => {
					imgSrc.value = error ?? defaultLoadingError;
					if (onError) onError(e as Event);
				};
				image.onload = (e: Event | string) => {
					imgSrc.value = src;
					if (onLoad) onLoad(e as Event);
				};
			}
		};

		const handleImgLoad = (e: Event) => {
			const { onLoad } = props;
			if ((e as unknown as LazyEventOptions).status === 'success' && onLoad) {
				onLoad(e);
			}
		};

		const handleImgError = (e: Event) => {
			const { onError } = props;
			if ((e as unknown as LazyEventOptions).status === 'error' && onError) {
				onError(e);
			}
		};

		imageLoad();

		return { bem, imgSrc, handleUnit, handleImgLoad, handleImgError };
	},
});
</script>
