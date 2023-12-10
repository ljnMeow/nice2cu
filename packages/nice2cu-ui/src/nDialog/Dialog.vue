<template>
	<n-popup
		v-model:visible="visible"
		:wrapper="wrapper"
		:round="round"
		:show-mask="showMask"
		:mask-click-close="maskClickClose"
		:mask-click-fun="handlerMaskClickClose"
		:mask-class="maskClass"
		:mask-style="maskStyle"
		:transition="transition"
		:z-index="zIndex"
		@open="handlerDialogOpen"
		@close="handlerDialogClose"
		@opened="handlerDialogOpened"
		@closed="handlerDialogClosed"
	>
		<div :class="[bem.b()]" :style="{ width: handleUnit(width) }">
			<div v-if="title" :class="bem.e('title')">{{ title }}</div>
			<div :class="[bem.e('message'), title ? bem.em('message', 'has-title') : undefined]">
				{{ handlerRenderContent }}
			</div>
			<div v-if="footer" :class="bem.e('footer')">
				<n-button
					v-if="showCancelButton"
					:disabled="cancelButtonDisabled"
					:class="bem.e('button')"
					size="small"
					:text-color="cancelButtonColor"
					:loading="loading.cancel"
					bg-color="transparent"
					@click="handlerCancel"
				>
					{{ cancelButtonText }}
				</n-button>
				<n-button
					v-if="showConfirmButton"
					:disabled="confirmButtonDisabled"
					:class="bem.e('button')"
					size="small"
					:text-color="confirmButtonColor"
					:loading="loading.confirm"
					bg-color="transparent"
					@click="handlerConfirm"
				>
					{{ confirmButtonText }}
				</n-button>
			</div>
		</div>
	</n-popup>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, isVNode, createVNode, toRefs, watch } from 'vue';
import { createNamespace } from '../../utils/create';
import { DialogProps, DialogPropsType, DialogActionType } from './DialogProps';
import { handleUnit, isBoolean, isPromise } from '../../utils/tools';
import nPopup from '../nPopup';
import nButton from '../nButton';
import './style/dialog.less';

export default defineComponent({
	name: 'NDialog',
	components: { nPopup, nButton },
	props: DialogProps,
	emits: ['cancel', 'confirm', 'update:visible', 'dialogOpen', 'dialogOpened', 'dialogClose', 'dialogClosed'],
	setup(props: DialogPropsType, { emit }) {
		const bem = createNamespace('dialog');
		const state = reactive({
			...props,
			loading: {
				cancel: false,
				confirm: false,
			},
		});

		watch(
			() => props.visible,
			() => {
				state.visible = props.visible;
			}
		);

		const handlerRenderContent = computed(() => {
			if (isVNode(state.content)) {
				return state.content;
			} else if (typeof state.content === 'function') {
				return state.content(createVNode);
			} else {
				return state.content;
			}
		});

		const handlerCancel = () => handlerBeforeClose('cancel');

		const handlerConfirm = () => handlerBeforeClose('confirm');

		const handlerMaskClickClose = () => (state.maskClickClose ? handlerBeforeClose('cancel') : undefined);

		const handlerBeforeClose = async (action: DialogActionType) => {
			try {
				if (!state.beforeClose) {
					handlerCloseAction(action);
					return;
				}

				state.loading[action] = true;
				const result = await state.beforeClose(action);

				if (isBoolean(result)) {
					if (result) {
						handlerCloseAction(action);
					} else {
						state.loading[action] = false;
					}
				} else if (isPromise(result)) {
					const isClose = await result;
					if (isClose) {
						handlerCloseAction(action);
					} else {
						state.loading[action] = false;
					}
				}
			} catch (error) {
				state.loading[action] = false;
			}
		};

		const handlerCloseAction = (action: DialogActionType) => {
			state.loading.cancel = false;
			state.loading.confirm = false;
			setTimeout(() => {
				state.visible = false;
				emit('update:visible', false);
				emit(action);
			}, 50);
		};

		const handlerDialogOpen = () => emit('dialogOpen');
		const handlerDialogOpened = () => emit('dialogOpened');
		const handlerDialogClose = () => emit('dialogClose');
		const handlerDialogClosed = () => {
			if (state.clearDialog) state.clearDialog(state.id);
			emit('dialogClosed');
		};

		// onMounted(() => {
		// 	if (state.closeOnPopstate) {
		// 		window.addEventListener('popstate', () => {
		// 			handlerCloseAction('cancel');
		// 		});
		// 	}
		// });

		return {
			bem,
			handleUnit,
			handlerRenderContent,
			state,
			...toRefs(state),
			handlerCancel,
			handlerConfirm,
			handlerMaskClickClose,
			handlerDialogOpen,
			handlerDialogOpened,
			handlerDialogClose,
			handlerDialogClosed,
		};
	},
});
</script>
