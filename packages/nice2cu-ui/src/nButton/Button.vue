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
		<n-loading
			ref="nLoading"
			:class="loading ? bem.e('loading') : ''"
			:color="textColor"
			parallel
			:type="loadingType"
			:loading="loading"
			:size="loadingSize"
			:text="loadingText"
			:loading-absolute="false"
			:show-mask="false"
		>
		</n-loading>
		<div :class="[bem.e('content'), loading ? bem.em('content', 'loading') : '']">
			<slot></slot>
		</div>
	</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createNamespace } from '../../utils/create';
import { ButtonProps, ButtonPropsType } from './ButtonProps';
import Ripple from '../../directives/ripple';
import NLoading from '../nLoading';
import './style/button.less';

export default defineComponent({
	name: 'NButton',
	directives: { Ripple },
	components: { NLoading },
	props: ButtonProps,
	setup(props: ButtonPropsType) {
		const bem = createNamespace('button');
		const nLoading = ref();

		const buttonclick = (e: Event) => {
			const { disabled, loading, onClick } = props;

			if (disabled || loading || !onClick) return;

			onClick(e);
		};

		return { bem, nLoading, buttonclick };
	},
});
</script>
