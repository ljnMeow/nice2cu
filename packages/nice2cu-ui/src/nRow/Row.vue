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
import { computed, defineComponent, getCurrentInstance, ComponentInternalInstance, provide, onMounted } from 'vue';
import { createNamespace } from '../../utils/create';
import { RowProps } from './RowProps';
import './style/row.less';

export default defineComponent({
	name: 'NRow',
	props: RowProps,
	setup(props: RowProps) {
		const bem = createNamespace('row');
		const gutter = computed(() => props.gutter);

		provide('rowOptions', {
			gutter,
		});

		const setColAttrs = () => {
			// 获取 row 下所有 col
			const componentInternalInstance = getCurrentInstance() as ComponentInternalInstance;
			const row = (componentInternalInstance.refs.row as HTMLElement).children || [];
			for (let i = 0; i < row.length; i++) {
				console.log((row[i] as HTMLElement).style.maxWidth);
			}
			// let len = row.length;

			// if (len === 0) return;

			// for (let i = 0; i < len; i++) {
			// 	// 布局模式
			// 	row[i].classList.add('bp-col');

			// 	// Gutter 处理
			// 	if (props.gutter !== 0 && len > 1) {
			// 		if (i !== 0) row[i].style.paddingLeft = `${props.gutter}px`;
			// 		if (i !== len - 1) row[i].style.paddingRight = `${props.gutter}px`;
			// 	}
			// }
		};

		onMounted(() => {
			setColAttrs();
		});
		return { bem };
	},
});
</script>
