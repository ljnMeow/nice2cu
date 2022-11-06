<template>
	<div :class="[bem.b()]">
		<n-icon v-if="type === 'circle'" icon="n-loading" :class="bem.b('circle')" :size="size" :color="color"></n-icon>
		<span :class="[bem.b('text')]" :style="style">{{ text }}</span>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { LoadingProps } from './LoadingProps';
import NIcon from '../nIcon';
import './style/loading.less';

export default defineComponent({
	name: 'NLoading',
	components: { NIcon },
	props: LoadingProps,
	setup(props: LoadingProps) {
		const bem = createNamespace('loading-container');

		const style = computed(() => {
			return {
				...(props.color ? { color: props.color } : {}),
			};
		});

		return { bem, style };
	},
});
</script>
