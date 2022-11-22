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
			:color="textColor"
			parallel
			:type="loadingType"
			:loading="loading"
			:size="loadingSize"
			:text="loadingText"
			:loading-absolute="false"
			:show-mask="false"
		>
			<div v-if="!loading" :class="bem.e('content')">
				<slot></slot>
			</div>
		</n-loading>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { ButtonProps } from './ButtonProps';
import Ripple from '../../directives/ripple';
import NLoading from '../nLoading';
import './style/button.less';

export default defineComponent({
	name: 'NButton',
	directives: { Ripple },
	components: { NLoading },
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
