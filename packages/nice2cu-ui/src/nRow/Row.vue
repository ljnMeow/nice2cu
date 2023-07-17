<template>
	<div
		ref="row"
		:class="[bem.b()]"
		:style="{
			justifyContent: justify,
			alignItems: align,
		}"
	>
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, provide } from 'vue';
import { createNamespace } from '../../utils/create';
import { RowProps, RowPropsType } from './RowProps';
import './style/row.less';

export default defineComponent({
	name: 'NRow',
	props: RowProps,
	setup(props: RowPropsType) {
		const bem = createNamespace('row');
		const gutter = computed(() => props.gutter);

		provide('rowProps', {
			gutter,
		});

		return { bem };
	},
});
</script>
