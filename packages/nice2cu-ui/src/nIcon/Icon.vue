<template>
	<i v-if="propsData.svg" :class="bem.b()" :style="{ margin: style.margin }">
		<span class="svg-content">
			<svg :class="bem.e('svg')" :style="{ ...style, margin: 0 }">
				<use :xlink:href="`#${propsData.icon}`"></use>
			</svg>
			<div v-if="propsData.badge" :class="bem.e('badge')">{{ typeof propsData.badge === 'boolean' ? '' : propsData.badge }}</div>
		</span>
		<slot></slot>
	</i>
	<i v-else :class="className" :style="style">
		<slot></slot>
		<div v-if="propsData.badge" :class="bem.e('badge')">{{ typeof propsData.badge === 'boolean' ? '' : propsData.badge }}</div>
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
		const propsData = { ...props };
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
		return { propsData, bem, className, style };
	},
});
</script>
