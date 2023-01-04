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
import { defineComponent, computed, provide, SetupContext, VNode } from 'vue';
import { createNamespace } from '../../utils/create';
import { RowProps } from './RowProps';
import Col from '../nCol/Col.vue';
import './style/row.less';

export default defineComponent({
	name: 'NRow',
	props: RowProps,
	setup(props: RowProps, context: SetupContext) {
		const bem = createNamespace('row');
		const gutter = computed(() => props.gutter);
		const defaults = context.slots.default ? context.slots.default() : [];

		defaults.forEach((tag: VNode) => {
			if (tag.type !== Col) {
				throw new Error('Row children must be Col, not allow other element and comment');
			}
		});

		provide('rowProps', {
			gutter,
		});

		return { bem };
	},
});
</script>
