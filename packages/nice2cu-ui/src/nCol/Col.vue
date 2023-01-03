<template>
	<div :class="[bem.b(), bem.b(`${span}`), bem.b(`offset-${offset}`)]" :style="style">
		<slot />
	</div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, inject } from 'vue';
import { createNamespace } from '../../utils/create';
import { ColProps } from './ColProps';
import './style/col.less';

export default defineComponent({
	name: 'NCol',
	props: ColProps,
	setup(props: ColProps) {
		const bem = createNamespace('col');
		const { gutter } = inject('rowOptions', { gutter: computed(() => 0) });

		const style = computed(() => {
			const styles: CSSProperties = {
				flexDirection: props.direction,
			};

			if (gutter.value) {
				styles.marginLeft = styles.marginRight = `${Number(gutter.value) / 2}px`;
			}
			return styles;
		});

		return { bem, style };
	},
});
</script>
