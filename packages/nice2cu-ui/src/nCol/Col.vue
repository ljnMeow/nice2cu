<template>
	<div ref="col" :class="colClasses" :style="style">
		<slot />
	</div>
</template>

<script lang="ts">
import { computed, inject, CSSProperties, defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { ColProps, ColPropsType } from './ColProps';
import './style/col.less';

export default defineComponent({
	name: 'NCol',
	props: ColProps,
	setup(props: ColPropsType) {
		const bem = createNamespace('col');

		const { gutter } = inject('rowProps', { gutter: computed(() => 0) });

		const colClasses = computed(() => [bem.b(), bem.b(`${props.span}`), bem.b(`offset-${props.offset}`)]);

		const style = computed(() => {
			const styles: CSSProperties = {
				flexDirection: props.direction,
			};

			if (gutter.value) {
				styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
			}

			return styles;
		});

		return { bem, colClasses, style };
	},
});
</script>
