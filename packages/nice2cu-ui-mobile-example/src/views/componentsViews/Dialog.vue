<template>
	<div class="container">
		<n-nav-bar title="Dialog 对话框" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">组件调用</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="visible = true">基本使用</n-button>
					<n-dialog
						v-model:visible="visible"
						title="标题"
						content="如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。"
						@confirm="handlerDialogClick('confirm')"
						@cancel="handlerDialogClick('cancel')"
					></n-dialog>
				</div>
			</div>
		</section>
		<section>
			<div class="title">函数式调用</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="handlerDialogOpen">基本使用</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="handlerDialogComfirmOpen">基本使用</n-button>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Message, Dialog } from 'nice2cu-ui';

const visible = ref(false);

let timer: NodeJS.Timeout;
const beforeClose = (action: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
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
				reject();
			}
		})();
	});
};

const handlerDialogClick = (action: string) => {
	Message.showMessage({
		type: action === 'confirm' ? 'success' : 'error',
		content: action,
	});
};

const handlerDialogOpen = () => {
	Dialog.showDialog({
		title: '函数调用',
		content: '啊巴巴爸爸巴巴爸爸吧',
	});
};

const handlerDialogComfirmOpen = () => {
	Dialog.showConfirmDialog({
		title: '啊啊',
		content: '女生都悄悄哈佛去前后放你离开后我去问钱哦豁问哦去问候期待后期我的后去和我的起都去我电话i去玩',
		beforeClose: (action: any) => {
			if (action === 'cancel') {
				Dialog.showDialog({
					title: '函数调用',
					content: '啊巴巴爸爸巴巴爸爸吧',
					beforeClose: (action: any) => {
						if (action === 'confirm') {
							Dialog.closeDialog();
							return false;
						}
					},
				});
				return false;
			}
		},
		onConfirm: () => {
			console.log('123');
		},
		onCancel: () => {
			console.log('345');
		},
	});
};
</script>
