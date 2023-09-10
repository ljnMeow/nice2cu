<template>
	<div
		:class="[bem.b(), bem.m(plain ? `plain-${type}` : type), round ? bem.m('round') : '', bem.m(size), plain ? bem.e('plain') : undefined]"
		:style="{ background: !plain ? color : undefined, color: color && !plain ? '#ffffff' : plain ? color : undefined }"
	>
		<span :class="[bem.b('text'), bem.bm('text', size)]" :style="{ color: textColor }">
			<slot />
		</span>

		<n-icon
			v-if="closeable"
			:class="[bem.b('close'), bem.bm('close', size)]"
			:class-prefix="classPrefix"
			:icon="closeName"
			@click="handlerCloseTag"
		></n-icon>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { TagProps, TagPropsType } from './TagProps';
import nIcon from '../nIcon';
import './style/tag.less';

export default defineComponent({
	name: 'NTag',
	components: { nIcon },
	props: TagProps,
	emits: ['close'],
	setup(props: TagPropsType, { emit }) {
		const bem = createNamespace('tag');

		const handlerCloseTag = (e: Event) => {
			emit('close', e);
		};

		return { bem, handlerCloseTag };
	},
});
</script>
