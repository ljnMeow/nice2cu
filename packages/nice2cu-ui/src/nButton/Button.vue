<template>
	<button
		v-ripple
		:class="[
			bem.b(),
			bem.m(propsData.type),
			bem.m(propsData.size),
			propsData.border ? bem.m(`border-${propsData.type}`) : '',
			propsData.disabled ? bem.m(`disabled`) : '',
			propsData.block ? bem.m('block') : '',
			bem.m(propsData.shape),
		]"
		:disabled="propsData.disabled"
	>
		<div :class="bem.e('content')">
			<slot></slot>
		</div>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { ButtonProps } from './ButtonProps';
import Ripple from '../../directives/ripple';
import './style/button.less';

export default defineComponent({
	name: 'NButton',
	directives: { Ripple },
	props: ButtonProps,
	setup(props: ButtonProps) {
		const bem = createNamespace('button');
		const propsData = { ...props };
		return { propsData, bem };
	},
});
</script>
