<template>
	<div :class="[bem.b(), outline ? bem.m('outline') : undefined, bem.m(layout)]">
		<slot name="img">
			<img
				v-if="src"
				:class="[bem.e('image')]"
				:src="src"
				:alt="alt"
				:style="{
					objectFit: fit,
					height: layout === 'vertical' ? handleUnit(imageHeight) || 'auto' : '100%',
					width: layout === 'vertical' ? handleUnit(imageWidth) || '100%' : 'var(--card-horizontal-image-width)',
				}"
			/>
		</slot>
		<div :class="[bem.e('container')]">
			<div v-if="title" :class="[bem.e('title'), isTitleEllipsis ? 'text-ellipsis' : undefined]">{{ title }}</div>
			<div v-if="subtitle" :class="[bem.e('subtitle'), isSubtitleEllipsis ? 'text-ellipsis' : undefined]">{{ subtitle }}</div>
			<div v-if="description" :class="[bem.e('description')]">{{ description }}</div>
			<div v-if="$slots.footer" :class="[bem.e('footer')]">
				<slot name="footer" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { handleUnit } from '../../utils/tools';
import { CardProps } from './CardProps';
import './style/card.less';

export default defineComponent({
	name: 'NCard',
	props: CardProps,
	setup() {
		const bem = createNamespace('card');

		return { bem, handleUnit };
	},
});
</script>
