<template>
	<div class="container">
		<n-nav-bar title="Message 消息提示" show-left left-text="" :shadow-buttom="true" fixed-top safe-area-inset-top placeholder></n-nav-bar>

		<section>
			<div class="title">基本用法</div>
			<div class="content unflex">
				<div class="item">
					<n-button type="primary" block @click="showMessage">基础用法</n-button>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { Message } from 'nice2cu-ui';

const showMessage = () => {
	Message.showMessage({
		content: '哈哈哈哈',
	});
};
</script>
