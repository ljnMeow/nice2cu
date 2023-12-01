<template>
	<teleport :to="wrapper" :disabled="wrapperDisabled">
		<Transition name="mask-fade">
			<div v-if="showMask && visible" :class="[bem.b('mask'), maskClass]" :style="maskStyle" @click="hanlderMaskClickClose"></div>
		</Transition>
		<Transition :name="transitionName" @after-enter="popupOpen" @after-leave="popupclose">
			<div
				v-if="visible"
				:class="[bem.b(), bem.m(position), round ? bem.m('round') : undefined, popClass]"
				:style="{
					width: ['left', 'right'].includes(position) ? handleUnit(width) : 'auto',
					height: ['top', 'bottom'].includes(position) ? handleUnit(height) : 'auto',
					...popStyle,
				}"
			>
				<slot />
			</div>
		</Transition>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { createNamespace } from '../../utils/create';
import { PopupProps, PopupPropsType } from './PopupProps';
import { handleUnit } from '../../utils/tools';
import './style/popup.less';

export default defineComponent({
	name: 'NPopup',
	props: PopupProps,
	emits: ['open', 'close', 'update:visible'],
	setup(props: PopupPropsType, { emit }) {
		const bem = createNamespace('popup');

		const transitionName = computed(() => {
			return props.transition ? props.transition : `n-popup-transition-${props.position}`;
		});

		const popupOpen = (el: Element) => {
			emit('update:visible', true);
			emit('open', el);
		};

		const popupclose = (el: Element) => {
			emit('update:visible', false);
			emit('close', el);
		};

		const hanlderMaskClickClose = () => {
			if (props.maskClickClose) emit('update:visible', false);
		};

		return { bem, transitionName, popupOpen, popupclose, handleUnit, hanlderMaskClickClose };
	},
});
</script>
