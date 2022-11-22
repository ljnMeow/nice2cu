<template>
	<div :class="[bem.b()]">
		<div
			v-if="loading"
			:class="[
				bem.b('container'),
				parallel ? bem.bm('container', 'parallel') : '',
				slotDefault && loadingAbsolute ? bem.bm('container', 'absolute') : '',
			]"
		>
			<n-icon v-if="type === 'circle'" icon="n-loading-circle" :class="[bem.b('circle'), bem.bm('circle', size)]" :color="color"></n-icon>
			<div v-if="['time', 'rever', 'battery'].includes(type)" :class="[bem.b(type), bem.bm(type, size)]" :style="{ color: color }"></div>
			<div v-if="type === 'bounce'" :class="[bem.b('bounce'), bem.bm('bounce', size)]" :style="{ color: color }">
				<span></span>
				<span></span>
			</div>
			<div
				v-if="!['circle', 'time', 'rever', 'bounce', 'battery'].includes(type)"
				:class="[bem.b(type), bem.bm(type, size)]"
				:style="{ color: color }"
			>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<p
				v-if="text"
				:class="[bem.b('text'), bem.bm('text', size)]"
				:style="[
					{
						color: color,
					},
				]"
			>
				{{ text }}
			</p>
		</div>
		<div class="slot-content">
			<div v-if="showMask" :class="slotDefault && loading ? bem.b('mask') : ''"></div>
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useSlots } from 'vue';
import { createNamespace } from '../../utils/create';
import { LoadingProps } from './LoadingProps';
import NIcon from '../nIcon';
import './style/loading.less';

export default defineComponent({
	name: 'NLoading',
	components: { NIcon },
	props: LoadingProps,
	setup() {
		const bem = createNamespace('loading');
		const slotDefault = !!useSlots().default;

		return { bem, slotDefault };
	},
});
</script>
