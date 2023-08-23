<template>
	<div ref="ellipsis" :class="[bem.b()]">
		<div v-if="!isCalculate" ref="calculate" :class="[bem.m('calculate')]">{{ calculateText }}</div>
		<template v-if="!exceeded">
			{{ content }}
		</template>
		<template v-if="exceeded && !expanded && isCalculate">
			{{ contentObj && contentObj.endText }}<span v-if="showExpand" :class="bem.e('expandText')" @click.stop="handlerClick(1)">{{ expandText }}</span
			>{{ contentObj && contentObj.startText }}
		</template>
		<template v-if="exceeded && expanded">
			{{ content }}<span v-if="showExpand" :class="bem.e('expandText')" @click.stop="handlerClick(2)">{{ collapseText }}</span>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, watch, toRefs } from 'vue';
import { createNamespace } from '../../utils/create';
import { convertToNumber, waitingScreenRedrawn } from '../../utils/tools';
import { EllipsisProps, EllipsisPropsType } from './EllipsisProps';
import './style/ellipsis.less';

export default defineComponent({
	name: 'NEllipsis',
	props: EllipsisProps,
	setup(props: EllipsisPropsType) {
		const bem = createNamespace('ellipsis');

		const ellipsis = ref<HTMLElement | null>(null);
		const calculate = ref<HTMLElement | null>(null);
		const isCalculate = ref<boolean>(false);
		const calculateText = ref(props.content);
		const state = reactive({
			exceeded: false,
			expanded: false,
			contentObj: { startText: '', endText: '' } as { startText?: string; endText?: string },
		});
		const dot = '...';
		let maxHeight = 0;

		const calcEllipse = async () => {
			if (!ellipsis.value || !calculate.value) return;
			const originStyle = window.getComputedStyle(calculate.value);
			const lineHeight = convertToNumber(originStyle.lineHeight === 'normal' ? props.lineHeight : originStyle.lineHeight);

			maxHeight = Math.floor(
				lineHeight * (Number(props.rows) + 0.5) + convertToNumber(originStyle.paddingTop) + convertToNumber(originStyle.paddingBottom)
			);

			if (calculate.value.offsetHeight <= maxHeight) {
				state.exceeded = false;
				isCalculate.value = true;
			} else {
				state.exceeded = true;
				const end = props.content.length;
				const middle = Math.floor((0 + end) / 2);
				state.contentObj = props.direction === 'center' ? await cuttingMiddleText([0, middle], [middle, end]) : await cuttingText(0, end);
				isCalculate.value = true;
			}
		};

		const cuttingMiddleText = async (leftPart: [number, number], rightPart: [number, number]): Promise<{ startText?: string; endText?: string }> => {
			const actionText = props.showExpand ? (state.expanded ? props.collapseText : props.expandText) : '';
			const end = props.content.length;

			if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
				return {
					endText: props.content.slice(0, leftPart[0]) + dot,
					startText: dot + props.content.slice(rightPart[1], end),
				};
			}

			const leftPartMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2);
			const rightPartMiddle = Math.ceil((rightPart[0] + rightPart[1]) / 2);

			calculateText.value = props.content.slice(0, leftPartMiddle) + dot + actionText + dot + props.content.slice(rightPartMiddle, end);

			await waitingScreenRedrawn();

			if (calculate.value!.offsetHeight <= maxHeight) {
				return cuttingMiddleText([leftPartMiddle, leftPart[1]], [rightPart[0], rightPartMiddle]);
			} else {
				return cuttingMiddleText([leftPart[0], leftPartMiddle], [rightPartMiddle, rightPart[1]]);
			}
		};

		const cuttingText: (left: number, right: number) => Promise<{ startText?: string; endText?: string }> = async (left: number, right: number) => {
			const actionText = props.showExpand ? (state.expanded ? props.collapseText : props.expandText) : '';
			const end = props.content.length;

			if (right - left <= 1) {
				if (props.direction === 'end') {
					return { endText: props.content.slice(0, left) + dot };
				} else {
					return { startText: dot + props.content.slice(right, end) };
				}
			}

			const middle = Math.round((left + right) / 2);
			if (props.direction === 'end') {
				calculateText.value = props.content.slice(0, middle) + dot + actionText;
			} else {
				calculateText.value = actionText + dot + props.content.slice(middle, end);
			}

			await waitingScreenRedrawn();

			if (calculate.value!.offsetHeight <= maxHeight) {
				if (props.direction === 'end') {
					return cuttingText(middle, right);
				} else {
					return cuttingText(left, middle);
				}
			} else {
				if (props.direction === 'end') {
					return cuttingText(left, middle);
				} else {
					return cuttingText(middle, right);
				}
			}
		};

		const handlerClick = (type: number) => {
			if (type === 1) {
				state.expanded = true;
			} else if (type === 2) {
				state.expanded = false;
			}
		};

		watch(
			() => [props.rows, props.direction, props.content],
			(newVal, oldVal) => {
				if (newVal != oldVal) calcEllipse();
			}
		);

		onMounted(() => calcEllipse());

		return { bem, ellipsis, calculate, calculateText, isCalculate, ...toRefs(state), handlerClick };
	},
});
</script>
