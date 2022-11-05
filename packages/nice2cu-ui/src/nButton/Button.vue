<template>
	<button
		v-ripple="{ disabled: disabled, isRipple: isRipple }"
		:class="[
			bem.b(),
			bem.m(type),
			bem.m(size),
			border ? bem.m(`border-${type}`) : '',
			disabled ? bem.m(`disabled`) : '',
			block ? bem.m('block') : '',
			bem.m(shape),
		]"
		:style="{
			color: textColor,
			background: bgColor,
		}"
		:disabled="disabled"
		@click="buttonclick"
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

		const buttonclick = (e: Event) => {
			const { disabled, loading, onClick } = props;

			if (disabled || loading || !onClick) return;

			onClick(e);
		};

		return { bem, buttonclick };
	},
});
</script>
