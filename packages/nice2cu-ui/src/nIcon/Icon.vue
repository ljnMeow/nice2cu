<template>
	<i v-if="svg" :class="bem.b()" :style="{ margin: style.margin }">
		<span class="svg-content">
			<svg :class="bem.e('svg')" :style="{ ...style, margin: 0 }">
				<use :xlink:href="`#${icon}`"></use>
			</svg>
			<div v-if="badge" :class="bem.e('badge')">{{ typeof badge === 'boolean' ? '' : badge }}</div>
		</span>
		<slot></slot>
	</i>
	<i v-else :class="className" :style="style">
		<slot></slot>
		<div v-if="badge" :class="bem.e('badge')">{{ typeof badge === 'boolean' ? '' : badge }}</div>
	</i>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import { createNamespace } from '../../utils/create';
import { handleUnit } from '../../utils/tools';
import { IconProps } from './IconProps';
import './style/icon.less';
import './assets/font';

export default defineComponent({
	name: 'NIcon',
	props: IconProps,
	setup(props: IconProps) {
		const bem = createNamespace('icon');
		const className: ComputedRef<string[]> = computed(() => {
			return [bem.b(), props.classPrefix, props.icon];
		});
		const style = computed(() => {
			if (props.svg) {
				return {
					...(props.margin ? { margin: handleUnit(props.margin) } : {}),
					...(props.size ? { width: handleUnit(props.size) } : {}),
					...(props.size ? { height: handleUnit(props.size) } : {}),
				};
			} else {
				return {
					...(props.size ? { 'font-size': handleUnit(props.size) } : {}),
					...(props.margin ? { margin: handleUnit(props.margin) } : {}),
					...(props.color ? { color: props.color } : {}),
				};
			}
		});
		return { bem, className, style };
	},
});
</script>
