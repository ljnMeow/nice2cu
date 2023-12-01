<template>
	<div :class="[bem.b('outer')]">
		<div :class="[bem.b()]"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { DialogProps, DialogPropsType } from './DialogProps';

export default defineComponent({
	name: 'NDialog',
	props: DialogProps,
	setup(props: DialogPropsType) {
		const bem = createNamespace('dialog');

		return { bem };
	},
});
</script>
