<template>
	<div class="container">
		<n-nav-bar title="Toast 消息提示" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基本用法</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="showToast()">文字提示</n-button>
				</div>
				<div class="item">
					<n-button type="success" block @click="showStatusToast('成功', 'success')">成功提示</n-button>
				</div>
				<div class="item">
					<n-button type="warning" block @click="showStatusToast('警告', 'warning')">警告提示</n-button>
				</div>
				<div class="item">
					<n-button type="danger" block @click="showStatusToast('失败', 'error')">失败提示</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="showToastLoading">加载提示</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">自定义属性</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="showToastCostomIcon">自定义图标</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="showToastCostomContent">自定义内容</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">动态content</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="showCountDown">倒计时</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">带遮罩的toast</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="showMaskToast">带透明遮罩无法点击后面</n-button>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { Toast, nAvatar } from 'nice2cu-ui';

const showToast = () => {
	Toast.showToast({
		content: 'Nice2CU-UI',
	});
};

const showStatusToast = (msg: string, type: string) => {
	Toast.showToast({
		content: msg,
		type: type,
	});
};

const showToastLoading = () => {
	Toast.showToastLoading();
};

const showToastCostomIcon = () => {
	Toast.showToast({
		content: '自定义图标',
		icon: 'n-beer-sharp',
	});
};

const showToastCostomContent = () => {
	Toast.showToast({
		content: (h: any) => h(nAvatar, { src: 'https://bu.dusays.com/2023/06/04/647c4b5936222.webp' }),
	});
};

let timer: NodeJS.Timeout;
const showCountDown = () => {
	let times = 6;

	if (timer) clearInterval(timer);

	const toast = Toast.showToastLoading({
		id: 'loading',
		content: `倒计时${times}秒`,
		duration: 0,
		onClose: () => {
			Toast.showToast({
				content: '时间到！！！',
			});
		},
	});
	timer = setInterval(() => {
		times--;

		if (!times) {
			clearInterval(timer);
			Toast.hideToastLoading('loading');
		} else {
			toast.state.content = `倒计时${times}秒`;
		}
	}, 1000);
};

const showMaskToast = () => {
	Toast.showToastLoading({
		duration: 0,
		hasMask: true,
	});

	setTimeout(() => {
		Toast.hideToastLoading();
	}, 3000);
};
</script>
