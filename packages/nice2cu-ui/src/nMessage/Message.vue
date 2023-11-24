<!-- eslint-disable vue/no-v-html -->
<template>
	<div :class="bem.b('outer')">
		<Transition name="message-fade" @after-leave="transitionLeave">
			<div v-if="state.show" :class="[bem.b(), !state.loading ? bem.m(state.type) : bem.m('default')]" :style="{ ...styles, ...state.customStyle }">
				<n-icon
					v-if="(!state.loading && state.type !== 'default') || state.icon"
					:icon="typeStatusIcon"
					:class-prefix="state.iconPrefix"
					:size="handleUnit(state.iconSize)"
					:class="bem.b('icon')"
					:color="state.customStyle.color ? state.customStyle.color : '#ffffff'"
				></n-icon>
				<div :class="[bem.e('content')]">
					<component :is="handlerRenderContent" v-if="isVNode(state.content) || isFunction(state.content)" />
					<div
						v-if="state.content && !isVNode(state.content) && !isFunction(state.content)"
						:class="bem.e('text')"
						v-html="handlerRenderContent"
					></div>
				</div>
				<n-loading
					v-if="state.loading"
					:class="bem.b('loading')"
					:color="state.customStyle.color ? state.customStyle.color : '#ffffff'"
					size="small"
				></n-loading>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted, isVNode, createVNode } from 'vue';
import { createNamespace } from '../../utils/create';
import { MessageProps, MessagePropsType } from './MessageProps';
import { handleUnit, isFunction } from '../../utils/tools';
import NIcon from '../nIcon';
import NLoading from '../nLoading';
import './style/message.less';

export default defineComponent({
	name: 'NMessage',
	components: { NIcon, NLoading },
	props: MessageProps,
	setup(props: MessagePropsType) {
		const bem = createNamespace('message');

		const state = reactive({
			show: false,
			...props,
		});

		let timer: NodeJS.Timeout | null | undefined;

		const styles = computed(() => ({
			top: handleUnit(props.offset),
			zIndex: props.zIndex,
		}));

		const typeStatusIcon = computed(() => {
			let icon = '';
			switch (state.type) {
				case 'success':
					icon = 'n-success';
					break;
				case 'warning':
					icon = 'n-warning';
					break;
				case 'info':
					icon = 'n-alert-circle-sharp';
					break;
				case 'error':
					icon = 'n-error';
					break;
				default:
					icon = 'default';
					break;
			}
			return icon;
		});

		const handlerRenderContent = computed(() => {
			if (isVNode(state.content)) {
				return state.content;
			} else if (typeof state.content === 'function') {
				return state.content(createVNode);
			} else {
				return state.content;
			}
		});

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
			if (state.clearMessage) state.clearMessage(state.id);
		};

		if (state.duration) {
			timerourHide();
		}

		onMounted(() => {
			state.show = true;
		});

		return { bem, state, transitionLeave, styles, typeStatusIcon, handleUnit, isFunction, isVNode, handlerRenderContent };
	},
});
</script>
