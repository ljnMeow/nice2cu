<template>
	<div class="container">
		<n-nav-bar title="Popup 弹出层" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基本用法</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="popupShow('center')">居中展示</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="popupShow('left')">左侧弹出</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="popupShow('right')">右侧弹出</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="popupShow('top')">上方弹出</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="popupShow('bottom')">底部弹出</n-button>
				</div>
			</div>
			<n-popup
				v-model:visible="visible"
				:position="popupPosition"
				:mask-click-fun="() => (visible = false)"
				@open="popupOpen"
				@close="popupClose"
				@opened="popupOpened"
				@closed="popupClosed"
			>
				<div class="box">{{ popupPosition }}</div>
			</n-popup>
		</section>

		<section>
			<div class="title">异步关闭</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="visible1 = true">异步关闭</n-button>
				</div>
			</div>
			<n-popup
				v-model:visible="visible1"
				position="center"
				:mask-click-fun="maskClickFun"
				@open="popupOpen"
				@close="popupClose"
				@opened="popupOpened"
				@closed="popupClosed"
			>
				<div class="box">点击遮罩关闭</div>
			</n-popup>
		</section>

		<section>
			<div class="title">嵌套弹出</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="visible2 = true">嵌套弹出</n-button>
				</div>
			</div>
			<n-popup v-model:visible="visible2" position="center">
				<div class="box">
					<n-button type="primary" block @click="visible3 = true">嵌套弹出</n-button>
				</div>
			</n-popup>
			<n-popup v-model:visible="visible3" position="left">
				<div class="box">
					<n-button type="primary" block @click="visible4 = true">嵌套弹出</n-button>
				</div>
			</n-popup>
			<n-popup v-model:visible="visible4" position="bottom"> </n-popup>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { Message } from 'nice2cu-ui';
import { ref } from 'vue';

const visible = ref(false);
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const popupPosition = ref('center');

const popupShow = (position: string) => {
	visible.value = true;
	popupPosition.value = position;
};

const popupOpen = () => {
	Message.showMessage({
		content: '打开弹框',
		type: 'success',
		duration: 1000,
	});
};

const popupClose = () => {
	Message.showMessage({
		content: '关闭弹框',
		type: 'error',
		duration: 1000,
	});
};

const popupOpened = () => {
	Message.showMessage({
		content: '打开弹框动画结束',
		type: 'success',
		duration: 1000,
	});
};

const popupClosed = () => {
	Message.showMessage({
		content: '关闭弹框动画结束',
		type: 'error',
		duration: 1000,
	});
};

let timer: NodeJS.Timeout | null;
const maskClickFun = async () => {
	if (timer) return;

	let times = 5;

	Message.showMessage({
		content: '遮罩层被点击，返回true允许关闭弹窗，false阻止关闭',
		type: 'error',
		duration: 2000,
	});
	const loading = await Message.showMessageLoading({
		content: `倒计时${times}秒后关闭弹窗`,
		duration: 0,
	});

	let status = false;

	await new Promise<void>((resolve) => {
		timer = setInterval(() => {
			times--;
			if (!times) {
				clearInterval(timer!);
				timer = null;
				Message.hideMessageLoading();
				status = true;
				resolve();
			} else {
				loading.state.content = `倒计时${times}秒后关闭弹窗`;
			}
		}, 1000);
	});
	return status;
};
</script>

<style lang="less" scoped>
.box {
	width: 180px;
	margin: 0 auto;
	padding: 20px 24px;
	text-align: center;
}
</style>
