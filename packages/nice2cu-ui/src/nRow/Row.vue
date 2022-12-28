<template>
	<div :class="[bem.b()]">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ComponentInternalInstance, VNode, isVNode, reactive, provide, computed } from 'vue';
import { createNamespace } from '../../utils/create';
import './style/row.less';

function flatVNodes(subTree: any) {
	const vNodes: VNode[] = [];
	const flat = (subTree: any) => {
		if (subTree?.component) {
			flat(subTree?.component.subTree);
			return;
		}
		if (Array.isArray(subTree?.children)) {
			subTree.children.forEach((child: any) => {
				if (isVNode(child)) {
					vNodes.push(child);
					flat(child);
				}
			});
		}
	};
	flat(subTree);
	return vNodes;
}

export default defineComponent({
	name: 'NRow',
	setup() {
		const bem = createNamespace('row');

		onMounted(() => {
			const instances: ComponentInternalInstance[] = reactive([]);
			const parentInstance: ComponentInternalInstance = getCurrentInstance() as ComponentInternalInstance;
			const vNodes: any[] = flatVNodes(parentInstance.subTree);
			console.log('row', vNodes);
		});

		return { bem };
	},
});
</script>
