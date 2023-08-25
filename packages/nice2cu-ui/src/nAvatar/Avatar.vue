<template>
	<div
		ref="avatarEle"
		:class="[bem.b(), innerSize(size) ? bem.m(size as string) : '', round ? bem.m('round') : '', bordered ? bem.m('bordered') : '']"
		:style="{
			width: !innerSize(size) ? handleUnit(size) : undefined,
			height: !innerSize(size) ? handleUnit(size) : undefined,
			borderColor,
			backgroundColor: color,
		}"
		@click="onClick"
	>
		<template v-if="src">
			<img
				v-if="lazy"
				v-lazy="{ src: src, loading: loading, error: error, onLoadImg: handleImgLoad, onErrorImg: handleImgError }"
				:class="bem.e('image')"
				:alt="alt"
				:style="{ objectFit: fit }"
			/>
			<img v-else :class="bem.e('image')" :src="imgSrc" :alt="alt" :style="{ objectFit: fit }" />
		</template>

		<div v-else ref="textEle" :class="bem.e('text')" :style="{ transform: `scale(${scale})` }">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onActivated, onMounted, onUpdated, ref } from 'vue';
import { createNamespace } from '../../utils/create';
import { handleUnit } from '../../utils/tools';
import Lazy from '../../directives/lazy';
import { LazyEventOptions } from '../../directives/lazy';
import { defaultLoadingImg, defaultLoadingError } from '../../directives/lazy/defaultImg';
import { AvatarProps, AvatarPropsType, innerSize } from './AvatarProps';
import './style/avatar.less';

export default defineComponent({
	name: 'NAvatar',
	directives: { Lazy },
	props: AvatarProps,
	setup(props: AvatarPropsType) {
		const bem = createNamespace('avatar');

		const avatarEle = ref<HTMLElement | null>();
		const textEle = ref<HTMLElement | null>();

		const imgSrc = ref(props.loading ?? defaultLoadingImg);
		const scale = ref<number>(1);
		let isMounted = false;

		const getScale = () => {
			if (!avatarEle.value || !textEle.value) {
				scale.value = 1;
				return;
			}

			const avatarEleWidth = avatarEle.value.offsetWidth;
			const textEleWidth = textEle.value.offsetWidth;

			if (avatarEleWidth > textEleWidth) {
				scale.value = 1;
			} else {
				scale.value = avatarEleWidth / textEleWidth;
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

		const imageLoad = () => {
			const { lazy, src, error, onLoad, onError } = props;
			if (!lazy) {
				let image = new Image();
				image.src = src as string;
				image.onerror = (e: Event | string) => {
					imgSrc.value = error ?? defaultLoadingError;
					if (onError) onError(e as Event);
				};
				image.onload = (e: Event | string) => {
					imgSrc.value = src as string;
					if (onLoad) onLoad(e as Event);
				};
			}
		};

		if (!props.lazy && props.src) {
			imageLoad();
		}

		onMounted(() => {
			nextTick(() => {
				isMounted = true;
				getScale();
			});
		});

		onActivated(() => {
			if (!isMounted) return;
			getScale();
		});

		onUpdated(() => {
			getScale();
		});

		return { bem, avatarEle, textEle, imgSrc, innerSize, handleUnit, scale, handleImgLoad, handleImgError };
	},
});
</script>
