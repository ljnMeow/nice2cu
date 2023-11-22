<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<div
			v-if="state.hasMask"
			:class="state.hasMask ? bem.e('mask') : undefined"
			:style="{ backgroundColor: state.maskColor }"
			@click="clickMaskClose ? hideToast() : undefined"
		></div>
		<Transition name="toast-fade" @after-leave="transitionLeave">
			<div v-if="state.show" :class="[bem.b()]" :style="state.customStyle">
				<div :class="bem.b('inner')">
					<n-icon
						v-if="(state.type !== 'default' || state.icon) && !state.loading"
						:icon="state.icon ? state.icon : `n-${state.type}`"
						:class="bem.b('icon')"
						:size="handleUnit(state.iconSize)"
						:class-prefix="state.iconPrefix"
						:style="{ marginBottom: state.content ? '10px' : '0px' }"
					></n-icon>
					<n-loading
						v-if="state.loading"
						:class="bem.b('loading')"
						:style="{ marginBottom: state.content ? '10px' : '0px' }"
						:color="state.customStyle.color ? state.customStyle.color : '#ffffff'"
						size="large"
						:type="state.loadingType"
					></n-loading>
					<component :is="handlerRenderContent()" v-if="isVNode(state.content) || isFunction(state.content)" />
					<div
						v-if="state.content && !isVNode(state.content) && !isFunction(state.content)"
						:class="bem.e('content')"
						v-html="handlerRenderContent()"
					></div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, createVNode, isVNode } from 'vue';
import { createNamespace } from '../../utils/create';
import { ToastProps, ToastPropsType } from './ToastProps';
import { handleUnit, isFunction } from '../../utils/tools';
import NIcon from '../nIcon';
import NLoading from '../nLoading';
import './style/toast.less';

export default defineComponent({
	name: 'NToast',
	components: { NIcon, NLoading },
	props: ToastProps,
	setup(props: ToastPropsType) {
		const bem = createNamespace('toast');
		const state = reactive({
			show: false,
			...props,
		});
		let timer: NodeJS.Timeout | null | undefined;

		const handlerRenderContent = () => {
			if (isVNode(state.content)) {
				return state.content;
			} else if (typeof state.content === 'function') {
				return state.content(createVNode);
			} else {
				return state.content;
			}
		};

		const clearTimer = () => {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
		};

		const hideToast = () => {
			state.show = false;

			if (state.onClose) {
				state.onClose();
			}
		};

		const timerourHide = () => {
			clearTimer();
			if (state.duration) {
				timer = setTimeout(() => {
					hideToast();
				}, state.duration);
			}
		};

		const transitionLeave = () => {
			clearTimer();
			if (state.clearToast) state.clearToast(state.id);
		};

		if (state.duration) {
			timerourHide();
		}

		onMounted(() => {
			state.show = true;
		});

		return { bem, state, transitionLeave, handleUnit, handlerRenderContent, isVNode, isFunction, hideToast };
	},
});
</script>
