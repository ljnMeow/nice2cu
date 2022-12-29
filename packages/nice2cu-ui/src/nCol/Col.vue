<template>
	<div :class="[bem.b(), bem.b(`${span}`), bem.b(`offset-${offset}`)]" :style="{ flexDirection: direction }">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { ColProps } from './ColProps';
import './style/col.less';

export default defineComponent({
	name: 'NCol',
	props: ColProps,
	setup() {
		const bem = createNamespace('col');
		return { bem };
	},
});
</script>
