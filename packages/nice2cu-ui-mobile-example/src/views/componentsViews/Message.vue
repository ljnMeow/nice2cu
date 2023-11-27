<template>
	<div class="container">
		<n-nav-bar title="Message 消息提示" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基本用法</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="showMessage">基础用法</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="showMessagewithIcon">自定义图标</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="showMessageLoading">加载用法</n-button>
				</div>
				<div class="item">
					<n-button type="primary" block @click="showMessageLoadingMask">遮罩层，禁止点击穿透</n-button>
				</div>
			</div>
		</section>
		<section>
			<div class="title">状态提示</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="success" block @click="showMessageStatus('success', '成功')">成功</n-button>
				</div>
				<div class="item">
					<n-button type="warning" block @click="showMessageStatus('warning', '警告')">警告</n-button>
				</div>
				<div class="item">
					<n-button type="info" block @click="showMessageStatus('info', '提示')">提示</n-button>
				</div>
				<div class="item">
					<n-button type="danger" block @click="showMessageStatus('error', '错误')">错误</n-button>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { Message } from 'nice2cu-ui';

const showMessage = () => {
	Message.showMessage({
		content: 'Nice2CU-UI',
	});
};

const showMessagewithIcon = () => {
	Message.showMessage({
		content: 'Nice2CU-UI',
		icon: 'n-halloween',
		iconSize: '18',
	});
};

let timer: NodeJS.Timeout;
const showMessageLoading = () => {
	let times = 6;

	if (timer) clearInterval(timer);

	const loading = Message.showMessageLoading({
		content: `倒计时${times}秒`,
		duration: 0,
		onClose: () => {
			Message.showMessage({
				content: '时间到！！！',
			});
		},
	});

	timer = setInterval(() => {
		times--;

		if (!times) {
			clearInterval(timer);
			Message.hideMessageLoading();
		} else {
			loading.state.content = `倒计时${times}秒`;
		}
	}, 1000);
};

const showMessageLoadingMask = () => {
	Message.showMessageLoading({
		hasMask: true,
		clickMaskClose: true,
		duration: 0,
		maskColor: 'rgba(0, 0, 0, 0.5)',
	});
};

const showMessageStatus = (type: string, value: string) => {
	Message.showMessage({
		content: value,
		type: type,
	});
};
</script>
