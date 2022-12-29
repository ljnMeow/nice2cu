<template>
	<div ref="row" :class="[bem.b()]" :style="style">
		<slot />
	</div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, provide } from 'vue';
import { createNamespace } from '../../utils/create';
import { RowProps } from './RowProps';
import './style/row.less';

export default defineComponent({
	name: 'NRow',
	props: RowProps,
	setup(props: RowProps) {
		const bem = createNamespace('row');
		const gutter = computed(() => props.gutter);

		provide(Symbol('rowContextKey'), {
			gutter,
		});

		const style = computed(() => {
			const styles: CSSProperties = {
				justifyContent: props.justify,
				alignItems: props.align,
			};
			if (!props.gutter) {
				return styles;
			}
			styles.marginRight = styles.marginLeft = `-${Number(props.gutter) / 2}px`;
			return styles;
		});

		return { bem, style };
	},
});
</script>
