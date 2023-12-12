<template>
	<div class="container">
		<n-nav-bar title="Dialog 对话框" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">组件调用</div>
			<div class="content unflex">
				<div class="item">
					<n-button
						type="primary"
						block
						@click="
							() => {
								visible = true;
								showCancelButton = false;
							}
						"
						>提示弹窗</n-button
					>
				</div>
				<div class="item">
					<n-button
						type="primary"
						block
						@click="
							() => {
								visible = true;
								showCancelButton = true;
							}
						"
						>确认弹窗</n-button
					>
				</div>
			</div>
			<n-dialog
				v-model:visible="visible"
				:show-cancel-button="showCancelButton"
				title="标题"
				content="先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也"
				@confirm="handlerDialogClick('confirm')"
				@cancel="handlerDialogClick('cancel')"
			>
			</n-dialog>
		</section>
		<section>
			<div class="title">函数式调用</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="handlerDialogOpen()">提示弹窗</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="handlerDialogComfirmOpen">确认弹窗</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">异步关闭</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="handlerAsynchronousClose">异步关闭</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">嵌套使用</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="handlerDialogNestedUsage">嵌套使用</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">自定义插槽</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="visible1 = true">自定义插槽</n-button>
				</div>
			</div>
			<n-dialog ref="dialog" v-model:visible="visible1">
				<template #title>
					<div style="display: flex; align-items: center; justify-content: center">
						<n-icon icon="n-grape" size="20px" svg></n-icon>
						自定义标题
						<n-icon icon="n-grape" size="20px" svg></n-icon>
					</div>
				</template>
				<n-image src="https://bu.dusays.com/2023/07/03/64a289689b496.jpg"></n-image>
				<template #footer>
					<div class="footer">
						<n-button type="danger" size="small" @click="visible1 = false">取消</n-button>
						<n-button type="primary" size="small" @click="visible1 = false">确认</n-button>
					</div>
				</template>
			</n-dialog>
		</section>
		<section>
			<div class="title">全局设置</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="handlerSetGlobleDialogOptions">全局设置</n-button>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Message, Dialog } from 'nice2cu-ui';

const visible = ref(false);
const visible1 = ref(false);
const showCancelButton = ref(false);
const dialog = ref();

const handlerDialogClick = (action: string) => {
	Message.showMessage({
		type: action === 'confirm' ? 'success' : 'error',
		content: action,
	});
};

const handlerDialogOpen = (content?: string) => {
	Dialog.showDialog({
		title: '标题',
		content: content
			? content
			: '先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也',
		onConfirm: () => {
			handlerDialogClick('confirm');
		},
	});
};

const handlerDialogComfirmOpen = () => {
	Dialog.showConfirmDialog({
		title: '标题',
		content:
			'先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也',
		onConfirm: () => {
			handlerDialogClick('confirm');
		},
		onCancel: () => {
			handlerDialogClick('cancel');
		},
	});
};

const handlerAsynchronousClose = () => {
	Dialog.showConfirmDialog({
		title: '标题',
		content:
			'先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也',
		beforeClose: beforeClose,
		onConfirm: () => {
			handlerDialogClick('confirm');
		},
		onCancel: () => {
			handlerDialogClick('cancel');
		},
	});
};

let timer: NodeJS.Timeout;
const beforeClose = (action: string): Promise<boolean> => {
	return new Promise((resolve) => {
		(async () => {
			if (action === 'confirm') {
				let times = 6;

				if (timer) clearInterval(timer);

				const loading = await Message.showMessageLoading({
					content: `倒计时${times}秒后弹框关闭`,
					duration: 0,
					onClose: () => {
						resolve(true);
					},
				});

				timer = setInterval(() => {
					times--;

					if (!times) {
						clearInterval(timer);
						Message.hideMessageLoading();
					} else {
						loading.state.content = `倒计时${times}秒后弹框关闭`;
					}
				}, 1000);
			} else if (action === 'cancel') {
				resolve(true);
			}
		})();
	});
};

const handlerDialogNestedUsage = () => {
	Dialog.showConfirmDialog({
		title: '对话框1',
		content:
			'先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也',
		beforeClose: (action: any) => {
			if (action === 'confirm') {
				Dialog.showDialog({
					title: '对话框2',
					content: '宫中府中，俱为一体，陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也',
					onConfirm: () => {
						Dialog.closeDialog();
					},
				});
				return false;
			} else if (action === 'cancel') {
				return true;
			}
		},
	});
};

const handlerSetGlobleDialogOptions = () => {
	Dialog.setGlobleDialogOptions({
		id: 'GlobleDialog',
		round: false,
		confirmButtonColor: 'red',
	});
	handlerDialogOpen('全局设置只对函数式调用生效');
};
</script>

<style lang="less" scoped>
.footer {
	display: flex;
	justify-content: space-around;
	align-content: center;
	width: 100%;
	height: 44px;
}
</style>
