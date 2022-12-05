<template>
	<div
		:class="[bem.b(), block ? bem.m('block') : '']"
		:style="{ width: handleUnit(width), height: handleUnit(height), borderRadius: handleUnit(radius) }"
	>
		<img :class="bem.e('image')" :alt="alt" :title="title" :src="src" :style="{ objectFit: fit }" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { handleUnit } from '../../utils/tools';
import lazyPlugin from '../../directives/lazy';
import { ImageProps } from './ImageProps';
import './style/image.less';

export default defineComponent({
	name: 'NImage',
	directives: { lazyPlugin },
	props: ImageProps,
	setup() {
		const bem = createNamespace('image');

		const handleImgLoad = (e: Event) => {
			console.log(e);
		};

		return { bem, handleUnit, handleImgLoad };
	},
});
</script>
