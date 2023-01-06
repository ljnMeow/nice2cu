<template>
	<div :class="[bem.b()]">
		<transition :name="`${bem.b()}-fade`">
			<span v-if="!hidden" :class="[bem.b('content'), ...contentClasses]" :style="{ background: color }">
				{{ value }}
			</span>
		</transition>
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { createNamespace } from '../../utils/create';
import { BadgeProps } from './BadgeProps';
import { toNumber } from '../../utils/tools';
import './style/badge.less';

export default defineComponent({
	name: 'NBadge',
	props: BadgeProps,
	setup(props: BadgeProps, { slots }) {
		const bem = createNamespace('badge');

		const contentClasses = computed(() => {
			const { position, dot } = props;

			const dotClass = dot ? bem.e('dot') : null;
			const basePositionClass = slots.default && bem.m(position);

			let positionClass = null;

			if (dot && position.includes('right')) {
				positionClass = bem.em('dot', 'right');
			} else if (dot && position.includes('left')) {
				positionClass = bem.em('dot', 'left');
			}

			return [dotClass, basePositionClass, positionClass];
		});

		const value = computed(() => {
			const { content, dot, maxValue } = props;

			if (dot) return '';

			if (content !== undefined && maxValue !== undefined && toNumber(content) > maxValue) return `${maxValue}+`;

			return content;
		});

		return { bem, contentClasses, value };
	},
});
</script>
