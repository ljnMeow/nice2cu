<template>
	<div :class="[bem.b()]">123</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';

export default defineComponent({
	name: 'NImage',
	setup() {
		const bem = createNamespace('image');

		return { bem };
	},
});
</script>
