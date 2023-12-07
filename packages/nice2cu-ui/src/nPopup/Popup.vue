<template>
	<teleport :to="wrapper" :disabled="wrapperDisabled">
		<Transition name="mask-fade">
			<div v-if="showMask && visible" :class="[bem.b('mask'), maskClass]" :style="{ ...maskStyle, zIndex }" @click="hanlderMaskClickClose"></div>
		</Transition>
		<Transition :name="transitionName" @after-enter="popupOpen" @after-leave="popupclose">
			<div
				v-if="visible"
				:class="[bem.b(), bem.m(position), round ? bem.m('round') : undefined, popClass]"
				:style="{
					width: ['left', 'right'].includes(position) ? handleUnit(width) : 'auto',
					height: ['top', 'bottom'].includes(position) ? handleUnit(height) : 'auto',
					...popStyle,
					zIndex,
				}"
			>
				<slot />
			</div>
		</Transition>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { createNamespace } from '../../utils/create';
import { PopupProps, PopupPropsType } from './PopupProps';
import { handleUnit } from '../../utils/tools';
import './style/popup.less';

export default defineComponent({
	name: 'NPopup',
	props: PopupProps,
	emits: ['opened', 'closed', 'open', 'close', 'update:visible'],
	setup(props: PopupPropsType, { emit }) {
		const bem = createNamespace('popup');

		const transitionName = computed(() => {
			return props.transition ? props.transition : `n-popup-transition-${props.position}`;
		});

		const popupOpen = () => {
			emit('update:visible', true);
			emit('opened');
		};

		const popupclose = () => {
			emit('update:visible', false);
			emit('closed');
		};

		const hanlderMaskClickClose = async () => {
			let status = false;
			props.maskClickFun ? (status = await props.maskClickFun()) : (status = true);

			if (props.maskClickClose && status) emit('update:visible', false);
		};

		watch(
			() => props.visible,
			() => {
				props.visible ? emit('open') : emit('close');
			}
		);

		return { bem, transitionName, popupOpen, popupclose, handleUnit, hanlderMaskClickClose };
	},
});
</script>
