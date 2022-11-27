<template>
	<div v-ripple="{ isRipple: isRipple }" :class="[bem.b(), border ? bem.m('border') : '']" @click="cellClick">
		<div v-if="icon || $slots.icon" :class="[bem.e('icon'), ...iconClass]">
			<slot name="icon">
				<nIcon :class="bem.m('icon')" :icon="icon" :size="iconSize" :class-prefix="iconPrefix"></nIcon>
			</slot>
		</div>
		<div :class="[bem.e('content')]">
			<div :class="[bem.e('title'), ...titleClass]">
				<slot>{{ title }}</slot>
			</div>
			<div v-if="description || $slots.description" :class="[bem.e('description'), ...descriptionClass]">
				<slot name="description">
					{{ description }}
				</slot>
			</div>
		</div>
		<div v-if="extra || url || link || showArrow || $slots.extra" :class="[bem.e('extra'), ...extraClass]">
			<slot name="extra">
				<nIcon
					:class="bem.m('extra')"
					:icon="url || link ? 'n-right' : showArrow ? `n-${showArrow}` : extra"
					:class-prefix="iconPrefix"
					:size="iconSize"
				></nIcon>
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create';
import { useRoute, routeProps } from '../../utils/useRoute';
import { CellProps } from './CellProps';
import nIcon from '../nIcon/Icon.vue';
import Ripple from '../../directives/ripple';
import './style/cell.less';

const combinationCellProps = Object.assign(CellProps, routeProps);

export default defineComponent({
	name: 'NCell',
	components: { nIcon },
	directives: { Ripple },
	props: combinationCellProps,
	setup(props) {
		const bem = createNamespace('cell');
		const route = useRoute();

		const cellClick = (e: Event) => {
			const { onClick } = props;
			if (props.url || props.link) {
				route();
			}
			if (!onClick) return;
			console.log('1312');
			onClick(e);
		};

		return { bem, cellClick };
	},
});
</script>
