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
import { ImageProps } from './ImageProps';
import './style/image.less';

export default defineComponent({
	name: 'NImage',
	props: ImageProps,
	setup() {
		const bem = createNamespace('image');

		return { bem, handleUnit };
	},
});
</script>
