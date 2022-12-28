<template>
	<div :class="[bem.b()]">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import './style/col.less';

export default defineComponent({
	name: 'NCol',
	setup() {
		const bem = createNamespace('col');

		return { bem };
	},
});
</script>
