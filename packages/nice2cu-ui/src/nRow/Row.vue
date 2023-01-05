<template>
	<div
		ref="row"
		:class="[bem.b()]"
		:style="{
			justifyContent: justify,
			alignItems: align,
		}"
	>
		<slot v-if="checkChild" />
		<p v-else style="color: red">Row children must be Col, not allow other element and comment</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, useSlots, VNode } from 'vue';
import { createNamespace } from '../../utils/create';
import { RowProps } from './RowProps';
import Col from '../nCol/Col.vue';
import './style/row.less';

export default defineComponent({
	name: 'NRow',
	props: RowProps,
	setup(props: RowProps) {
		const bem = createNamespace('row');
		const gutter = computed(() => props.gutter);
		const slots = useSlots();

		provide('rowProps', {
			gutter,
		});

		const checkChild = computed(() => {
			let status = true;
			if (slots && slots.default) {
				slots.default().forEach((tag: VNode) => {
					if (tag.type !== Col) {
						status = false;
						throw new Error('Row children must be Col, not allow other element and comment');
					}
				});
			}
			return status;
		});

		return { bem, checkChild };
	},
});
</script>
