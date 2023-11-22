<template>
	<div :class="bem.b()">123</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { MessageProps, MessagePropsType } from './MessageProps';

export default defineComponent({
	name: 'NMessage',
	props: MessageProps,
	setup(props: MessagePropsType) {
		const bem = createNamespace('message');

		return { bem };
	},
});
</script>
